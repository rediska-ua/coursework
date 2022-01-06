import sys
import time
import argparse
import nodeconnector
import re
from nltk.util import ngrams, pad_sequence, everygrams
from nltk.tokenize import word_tokenize
from nltk.lm import MLE, WittenBellInterpolated
import numpy as np
import plotly.graph_objects as go
from scipy.ndimage import gaussian_filter

from downloadAllData import checkText

parser = argparse.ArgumentParser(description='Python Exposed API')
parser.add_argument('--pynodeport', help='PyConnector Node.JS query port', default=24001)
args = parser.parse_args()
nodeq = nodeconnector.Interface()


def nodeq_version(args, ctx={}):
    return ('%d.%d.%d' % (sys.version_info[0], sys.version_info[1], sys.version_info[2]))


def nodeq_increment(args, ctx={}):
    ctx['inc'] += 1
    args['value'] = ctx['inc']

    return args


def return_result(args, ctx={}):
    print(args)
    train_text = args['text']
    sources = args['sources']
    result = checkText(train_text, sources)
    print(result)
    return result

nodeq.handle('text', return_result)

nodeq.listen(port=args.pynodeport)

while True:
    time.sleep(0.001)
