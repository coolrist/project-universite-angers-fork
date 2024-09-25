from django.shortcuts import render
from .. import utils
from ..helpers.User import User

# Create your views here.
def home(request):
    return render(request, "universite/index.html", {
            "meta": utils.metadata("À propos de l'Université d'Angers", User.s_bouvier(), "2021-10-20", "58294256-ee7b-4af4-903f-31a780cddd84",
                                   subject="Université Angers, Angers, 1h30 de Paris, Ouest, Angers, Cholet, Saumur")
        })

def qs_nos_missions_et_nos_valeurs(request):
    return render(request, "universite/qui-sommes-nous/nos-missions-et-nos-valeurs.html", {
            "meta": utils.metadata("Nos missions", User.s_bouvier(), "2021-10-20", "ce788572-57a1-4ac0-a06f-1dcfd773047d",
                                   subject="citoyenneté, innovation, accompagnement, partage, ouverture, ancrage territorial, territoire, valeurs")
        })

def fn_organigramme(request):
    return render(request, "universite/fonctionnement/organigramme.html", {
            "meta": utils.metadata("Organigramme interactif", User.a_caillon(), "2024-08-26", "d7d84ee0-030c-4d90-8e86-4e08dbad9c39")
        })

def strategies_et_grands_projets(request):
    return render(request, "universite/strategies-et-grands-projets/index.html")

def les_chantiers_de_l_ua(request):
    return render(request, "universite/les-chantiers-de-l-ua/index.html", {
            "meta": utils.metadata("Les chantiers de l'UA", User.s_bouvier(), "2020-09-14", "0b7356be-6929-482e-84d1-60465df826be",
                                   creator=User.d_boisdron(), publisher=User.d_boisdron())
        })

def travailler_a_l_ua(request):
    return render(request, "universite/travailler-a-l-ua/index.html", {
            "meta": utils.metadata("Travailler à l'UA", User.g_haumont(), "2023-12-15", "76afcb42-890c-40e4-9ade-2decf42edceb",
                                   creator=User.g_haumont(), publisher=User.g_haumont(), subject="travailler, recrutement, emplois, employeur")
        })

def tua_enseignants_enseignants_chercheurs(request):
    return render(request, "universite/travailler-a-l-ua/enseignants-enseignants-chercheurs.html", {
            "meta": utils.metadata("Enseignants-chercheurs", User.g_haumont(), "2019-01-25", "4d103a96-befa-4c0b-a9b1-4cba2a745d78",
                                   creator=User.g_haumont(), publisher=User.g_haumont())
        })

def hrs4r(request):
    return render(request, "universite/hrs4r/index.html", {
            "meta": utils.metadata("Labellisation HRS4R", User.s_bouvier(), "2022-11-30", "fb735f38-177a-40d9-9c99-50984ee636cf")
        })