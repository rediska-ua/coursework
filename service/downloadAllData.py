import json
from sklearn.metrics.pairwise import cosine_similarity
from telethon import TelegramClient, events, sync
from telethon.tl.functions.messages import GetHistoryRequest
import re
from pymongo import MongoClient
from nltk import edit_distance
from bson.json_util import dumps

from helpers.vector import checkWithCosineSimilarity, getWordCloud, normalize_document, find_tokens, delete_stop_words, showSimilaritiesInText, to_lemmantize_words
import pandas as pd

#from nlpforcoursework.vector import delete_stop_words

api_id = 17019734
api_hash = 'b1e0975672711a4b9e3d59543a8114af'

client = TelegramClient('session_name', api_id, api_hash)
client.connect()

def remove_emoji(string):
    emoji_pattern = re.compile("["
    u"\U0001F600-\U0001F64F"
    u"\U0001F300-\U0001F5FF"
    u"\U0001F680-\U0001F6FF"
    u"\U0001F1E0-\U0001F1FF"
    u"\U00002500-\U00002BEF"
    u"\U00002702-\U000027B0"
    u"\U00002702-\U000027B0"
    u"\U000024C2-\U0001F251"
    u"\U0001f926-\U0001f937"
    u"\U00010000-\U0010ffff"
    u"\u2640-\u2642"
    u"\u2600-\u2B55"
    u"\u200d"
    u"\u23cf"
    u"\u23e9"
    u"\u231a"
    u"\ufe0f"
    u"\u3030"
    u"\u200b"
    "]+", flags = re.UNICODE)

    return emoji_pattern.sub(r'', string)

channelUa = ['@hromadske_ua', '@suspilnenews', '@censor_net', '@liganet', '@babel', '@znua_live']


def listToString(s): 
    str1 = " " 
    return (str1.join(s))


def getChannelMessages(channels):
    result = []
    for channel_name in channels:
        history = client(GetHistoryRequest(
            peer=channel_name,
            offset_id=0,
            offset_date=None,
            add_offset=0,
            limit=100,
            max_id=0,
            min_id=0,
            hash=0
        ))
        messages = history.messages
        result.append((channel_name, messages))
    return result


def formatMessage(message):
    message_split = message.split('\n')
    message_filtered = filter(lambda part: part != '', message_split)
    filtered = list(message_filtered)
    result = []
    for sent in filtered:
        resulted = remove_emoji(sent)
        result.append(resulted)
    return result


def getMessages(channels):
    messages = getChannelMessages(channels)
    return messages


def get_database():
    CONNECTION_STRING = "mongodb+srv://rediska:Northwind2021@cluster.0gnxi.mongodb.net/telegramInfo?retryWrites=true&w=majority"
    client = MongoClient(CONNECTION_STRING)
    return client["telegramInfo"]

stopwords_ua = pd.read_csv("stopwords_ua.txt", header=None, names=['stopwords'])
stop_words_ua = list(stopwords_ua.stopwords)

def insertToDB():
    dbname = get_database()
    collection = dbname['ua_info']
    messages = getMessages(channelUa)
    for (channel_name, channel) in messages:
        for message in channel:
            if message.message == None:
                continue
            new_message = listToString(formatMessage(message.message))
            normalized_message = normalize_document(new_message)
            norm_message_without_stop = delete_stop_words(find_tokens(normalized_message), stop_words_ua)
            lemmantized_message = to_lemmantize_words(norm_message_without_stop)
            sorted_dict = dict(sorted(lemmantized_message.items(), key=lambda item: item[1], reverse=True))
            sorted_list = list(sorted_dict.keys())
            keys = sorted_list[0:10]
            item = {
                "date": message.date,
                "original_text": new_message,
                "normalized_text": listToString(list(lemmantized_message.keys())),
                "key_words": keys,
                "channel": channel_name
            }
            collection.insert_one(item)


#insertToDB()


def find_similiar_news(keywords, sources):
    dbname = get_database()
    collection = dbname['ua_info']
    posts = collection.find({ "channel": { "$in": sources } })
    similiar_news = []
    for item in posts:
        similiar_keys = []
        for key in keywords:
            if (key in item['key_words']):
                similiar_keys.append(True)
        if (len(similiar_keys) > 1):
            similiar_news.append([item, len(similiar_keys)/10 * 100])
    return similiar_news

def parse_json(data):
    return json.loads(dumps(data))


def checkText(text, sources):
    normalized_message = normalize_document(text)
    norm_message_without_stop = delete_stop_words(find_tokens(normalized_message), stop_words_ua)
    lemmantized_message = to_lemmantize_words(norm_message_without_stop)
    sorted_dict = dict(sorted(lemmantized_message.items(), key=lambda item: item[1], reverse=True))
    sorted_list = list(sorted_dict.keys())
    keys = sorted_list[0:10]
    similiar_news = find_similiar_news(keys, sources)

    if len(similiar_news) == 0: 
        result = {
            "input_text": text,
            "verdict": False,
            "date": '',
            "original_source_text": '',
            "source_keywords": '',
            "picture": '',
            "cosine_similarity": '',
            "source_channel": ''
        }
        return result
    
    normilized_text = listToString(list(lemmantized_message.keys()))
    max_sim = 0
    sim_index = 0
    for index in range(0, len(similiar_news)):
        cos_sim_original = checkWithCosineSimilarity(text, similiar_news[index][0]['original_text'])
        cos_sim_norm = checkWithCosineSimilarity(normilized_text, similiar_news[index][0]['normalized_text'])
        sim = (cos_sim_norm * 0.3 + cos_sim_original * 0.7)

        if (sim > max_sim):
            max_sim = sim
            sim_index = index
    
    print(max_sim)
    #showSimilaritiesInText(similiar_news[sim_index][0]['original_text'], text)
    
    if (max_sim < 0.25):
        print(similiar_news[sim_index][0])
        result = {
            "input_text": text,
            "verdict": False,
            "date": '',
            "original_source_text": '',
            "source_keywords": '',
            "picture": '',
            "cosine_similarity": '',
            "source_channel": ''
        }
        return result
    else: 
        getWordCloud(lemmantized_message)
        parsed = parse_json(similiar_news[sim_index][0])
        print(parsed)
        result = {
            "input_text": text,
            "verdict": True,
            "date": parsed['date']['$date'],
            "original_source_text": parsed['original_text'],
            "source_keywords": parsed['key_words'],
            "picture": "saved_figure-100dpi.png",
            "cosine_similarity": max_sim,
            "source_channel": parsed['channel']
        }
        return result







