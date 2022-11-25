import pandas as pd
import json


oddData = pd.read_excel('Odds.xlsx')
bossList = []
print(len(oddData))
lengthi = 0
while lengthi < len(oddData):
    newrow = []
    for i in oddData.keys():
        newrow += [oddData[i][lengthi]]
    bossList += newrow
    lengthi+=1

a = {};
aa = 0;
dict1 = {}
while aa < len(bossList):

    dict2 = {}

    while(bossList[aa] == bossList[aa+5]):
        dict3 = {}
        dict3['dropChance'] = bossList[aa + 2]
        dict3['talentedDrop'] = bossList[aa + 3]
        dict3['uberDrop'] = bossList[aa + 4]
        dict2[bossList[aa + 1]] = dict3
        aa += 5
        if (aa+6 > len(bossList)):
            break

    dict3 = {}
    dict3['dropChance'] = bossList[aa + 2]
    dict3['talentedDrop'] = bossList[aa + 3]
    dict3['uberDrop'] = bossList[aa + 4]
    dict2[bossList[aa + 1]] = dict3
    dict1[bossList[aa]] = dict2
    dict1[bossList[aa]]['setCost'] = 0
    aa+=5

print(dict1)


