import re
import math
from numpy import vectorize
from pymorphy2 import MorphAnalyzer
from scipy.sparse import csc
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from collections import Counter
from nltk.tokenize.punkt import PunktSentenceTokenizer, PunktParameters
from nltk.tokenize import RegexpTokenizer
from nltk.util import clean_url, ngrams, pad_sequence, everygrams
from nltk.tokenize import word_tokenize
from nltk.lm import MLE, WittenBellInterpolated
import csv
from nltk.probability import FreqDist
import pandas as pd
import pymorphy2
from sklearn.metrics.pairwise import cosine_similarity
from wordcloud import WordCloud
import matplotlib.pylab as plt
import numpy as np
from scipy.ndimage import gaussian_filter
from nltk.tokenize import sent_tokenize, word_tokenize
import plotly.graph_objects as go

morph = pymorphy2.MorphAnalyzer(lang='uk')

def to_lower_case(text):
    result = text.lower()
    return result

def to_list(text):
    text_list = text.split('\n')
    return text_list

def normalize_document(text):
    text_in_lower_case = to_lower_case(text)
    special_characters = "``''–#$%&()*+,-./:;<=>?@[\]^_{|}!\"~" + '\n\xa0«»\t—…'
    text_list = to_list(text_in_lower_case)
    result_text = ' '.join(text_list)
    result_text = ''.join([char for char in result_text if char not in special_characters and not char.isdigit()])
    return result_text

def find_tokens(text):
    normalized_text = normalize_document(text)
    text_tokens = word_tokenize(normalized_text)
    fdist = FreqDist(text_tokens)
    #fdist.plot(30, cumulative=False)
    return fdist



def delete_stop_words(dictionary, stop_words):
    new_dict = dictionary.copy()
    for word in dictionary:
        if word in stop_words:
            new_dict.pop(word, None)
    return new_dict




def to_lemmantize_words(dictionary):
    lemmintized_words = {}
    for key in dictionary:
        normal_form = ''
        if (key == 'києві' or key == 'київ'):
            normal_form = morph.parse(key)[len(morph.parse(key)) - 1].normal_form
        else: 
            normal_form = morph.parse(key)[0].normal_form
        if normal_form in lemmintized_words:
            lemmintized_words[normal_form] += dictionary[key]
        else:
            lemmintized_words[normal_form] = dictionary[key]
    
    return lemmintized_words



def delete_numbers(dictionary):
    new_dict = dictionary.copy()
    for word in dictionary:
        new_dict.pop(word, None)
    return new_dict


def cosine_similarity_vectors(vec1, vec2):
    vec1 = vec1.reshape(1, -1)
    vec2 = vec2.reshape(1, -1)
    return cosine_similarity(vec1, vec2)[0][0]

        
def checkWithCosineSimilarity(text1, text2):
    cleaned = []
    cleaned.append(text1)
    cleaned.append(text2)

    print(cleaned)

    vectorizer = CountVectorizer().fit_transform(cleaned)
    vectors = vectorizer.toarray()

    return cosine_similarity_vectors(vectors[0], vectors[1])


def getWordCloud(lemmantized_words):
    fig = plt.figure()
    wordcloud = WordCloud().generate(" ".join(lemmantized_words))
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.axis("off")
    fig.savefig('../client/src/assets/saved_figure-100dpi.png', dpi = 100)


def showSimilaritiesInText(train_text, test_text):

    train_text = re.sub(r"\[.*\]|\{.*\}", "", train_text)
    train_text = re.sub(r'[^\w\s]', "", train_text)

    n = 4

    training_data = list(pad_sequence(word_tokenize(train_text, 'russian'), n, pad_left=True, left_pad_symbol="<s>"))

    ngrams = list(everygrams(training_data, max_len=n))
    print("Number of ngrams:", len(ngrams))

    model = WittenBellInterpolated(n)
    model.fit([ngrams], vocabulary_text=training_data)
    print(model)


    testing_data = list(pad_sequence(word_tokenize(test_text, 'russian'), n, pad_left=True, left_pad_symbol="<s>"))

    scores = []
    for i, item in enumerate(testing_data[n - 1:]):
        s = model.score(item, testing_data[i:i + n - 1])
        scores.append(s)

    scores_np = np.array(scores)

    width = 8
    height = np.ceil(len(testing_data) / width).astype("int32")
    print("Width, Height:", width, ",", height)

    a = np.zeros(width * height)
    a[:len(scores_np)] = scores_np
    diff = len(a) - len(scores_np)

    a = gaussian_filter(a, sigma=1.0)

    a = a.reshape(-1, width)

    labels = [" ".join(testing_data[i:i + width]) for i in range(n - 1, len(testing_data), width)]
    print(" ".join(testing_data))
    labels_individual = [x.split() for x in labels]
    labels_individual[-1] += [""] * diff
    labels = [f"{x:60.60}" for x in labels]

    fig = go.Figure(data=go.Heatmap(
        z=a, x0=0, dx=1,
        y=labels, zmin=0, zmax=1,
        customdata=labels_individual,
        hovertemplate='%{customdata} <br><b>Score:%{z:.3f}<extra></extra>',
        colorscale="burg"))
    fig.update_layout({"height": height * 28, "width": 1000, "font": {"family": "Courier New"}})
    fig['layout']['yaxis']['autorange'] = "reversed"

    fig.show()
