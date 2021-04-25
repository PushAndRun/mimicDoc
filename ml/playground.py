import matplotlib
import matplotlib.pyplot as plt
import numpy as np
import collections

matplotlib.use('tkagg')

def visualize_data():
    with open('../db/admissions.csv', 'r') as f:
        data = []

        for line in f:
            data.extend([line.strip('\n').split(',')])

    admissions = clean_data(data)
    print(admissions[0])
    alive = [adm for adm in admissions if adm[5] == 0]
    dead = [adm for adm in admissions if adm[5] == 1]

    ages_alive = [i[1] for i in alive]
    ages_alive_counter = collections.Counter(ages_alive)
    ages_alive_counter = sorted(ages_alive_counter.items())

    aged_dead = [i[1] for i in dead]
    ages_dead_counter = collections.Counter(aged_dead)
    ages_dead_counter = sorted(ages_dead_counter.items())

    weight_alive = [i[3] for i in alive]
    weight_alive_counter = collections.Counter(weight_alive)
    weight_alive_counter = sorted(weight_alive_counter.items())

    weight_dead = [i[3] for i in dead]
    weight_dead_counter = collections.Counter(weight_dead)
    weight_dead_counter = sorted(weight_dead_counter.items())

    length_alive = [i[4] for i in alive]
    length_alive_counter = collections.Counter(length_alive)
    length_alive_counter = sorted(length_alive_counter.items())

    length_dead = [i[4] for i in dead]
    length_dead_counter = collections.Counter(length_dead)
    length_dead_counter = sorted(length_dead_counter.items())

    plt.bar([i[0] for i in ages_alive_counter],  [i[1]/len(alive) for i in ages_alive_counter], color='green',
            alpha=0.5, width=1.0)
    plt.bar([i[0] for i in ages_dead_counter], [i[1]/len(dead) for i in ages_dead_counter], color='red', alpha=0.5,
            width=1.0)
    plt.ylabel('frequency')
    plt.xlabel('age')
    plt.show()

    plt.bar([i[0] for i in weight_alive_counter], [i[1] / len(alive) for i in weight_alive_counter], color='green',
            alpha=0.5, width=1.0)
    plt.bar([i[0] for i in weight_dead_counter], [i[1] / len(dead) for i in weight_dead_counter], color='red',
            alpha=0.5,width=1.0)
    plt.ylabel('frequency')
    plt.xlabel('weight')
    plt.show()

    plt.bar([i[0] for i in length_alive_counter], [i[1] / len(alive) for i in length_alive_counter], color='green',
            alpha=0.5, width=0.1)
    plt.bar([i[0] for i in length_dead_counter], [i[1] / len(dead) for i in length_dead_counter], color='red',
            alpha=0.5, width=0.1)
    plt.ylabel('frequency')
    plt.xlabel('length of stay in days')
    plt.show()

def clean_data(data: list):
    data.pop(0)

    good_data = []

    for adm in data:

        age = adm[1].split(' ')
        adm[1] = float(age[0])

        if adm[1] > 100:
            continue

        adm[3] = round(float(adm[3]))

        if adm[3] > 250:
            continue

        adm[4] = round(float(adm[4]), 1)

        if adm[4] > 21:
            continue

        adm[5] = float(adm[5])

        good_data.append(adm)

    return good_data

def calculate_average(lst: list):
    sum = 0.0
    for item in lst:
        sum += item

    return sum / len(lst)


if __name__ == '__main__':
    visualize_data()