from django.shortcuts import render
from .. import utils
from ..helpers.User import User

# Create your views here.
def futur_etudiant(request):
    return render(request, "vous-etes/futur-etudiant/index.html", {
            "meta": utils.metadata("L'Université met tout en oeuvre pour votre réussite !", User.c_durandeau(), "2022-12-19", "9d4e0a1c-f901-40e9-8490-4f9d91983d2a")
        })

def fe_decouvrir_l_universite(request):
    return render(request, "vous-etes/futur-etudiant/decouvrir-l-universite.html", {
            "meta": utils.metadata("Découvrir l'UA avec votre lycée", User.s_bouvier(), "2022-08-24", "96b25c46-6617-49dd-a04a-cf76aa9843c2")
        })

def fe_choisir_sa_formation(request):
    return render(request, "vous-etes/futur-etudiant/choisir-sa-formation.html", {
            "meta": utils.metadata("Choisir sa formation", User.t_des(), "2023-10-26", "11ee64ef-031c-41db-ab52-10b9372ffda6")
        })

def fe_candidater(request):
    return render(request, "vous-etes/futur-etudiant/candidater.html")

def fe_infos_pratiques(request):
    return render(request, "vous-etes/futur-etudiant/infos-pratiques.html", {
            "meta": utils.metadata("Code", User.s_bouvier(), "2021-09-29", "ce18d082-9188-4be2-8dd0-ebe8f741d501")
        })

def etudiant(request):
    return render(request, "vous-etes/etudiant/index.html", {
            "meta": utils.metadata("Le site Bienvenue à l'UA", User.c_durandeau(), "2024-05-24", "b18c4bc1-0f06-4f91-ac39-c3569d541e6b")
        })

def et_carte_pass_sup(request):
    return render(request, "vous-etes/etudiant/carte-pass-sup.html", {
            "meta": utils.metadata("Carte étudiante", User.c_durandeau(), "2024-08-22", "0146b4c0-9117-4e64-b45f-fcb821e6e66c",
                                   subject="passsup, pass sup, carte étudiante, carte multiservices")
        })

def et_scolarite(request):
    return render(request, "vous-etes/etudiant/scolarite.html", {
            "meta": utils.metadata("Inscription administrative", User.s_stephan(), "2024-08-30", "dc0891b2-4817-4e97-b020-bca213cb4294")
        })

def et_stages(request):
    return render(request, "vous-etes/etudiant/stages.html", {
            "meta": utils.metadata("Stages", User.a_baumard(), "2020-09-04", "f121b92a-1d15-47ef-8be6-12d973a5abc7",
                                    creator=User.l_hot(), publisher=User.l_hot(), description="notice explicative procédure de stages")
        })

def et_examens(request):
    return render(request, "vous-etes/etudiant/examens.html", {
            "meta": utils.metadata("Modalités d'examens", User.v_wattier(), "2023-09-05", "17449f8c-9b16-4526-b349-952938b43efa",
                                   subject="règlement des examens, mémo examens")
        })

def et_kit_numerique(request):
    return render(request, "vous-etes/etudiant/kit-numerique.html", {
            "meta": utils.metadata("Kit numérique", User.s_bouvier(), "2020-08-26", "ddd426b2-2d1f-47db-b784-6dc7736a6fbd",
                                    creator=User.s_bouvier(), publisher=User.s_bouvier())
        })

def et_bourses_et_aides(request):
    return render(request, "vous-etes/etudiant/bourses-et-aides.html", {
            "meta": {"subject":"bourse d'étude, demande de bourse crous", "date":"2021-05-18"}
        })

def et_enseignements_d_ouverture_optionnels(request):
    return render(request, "vous-etes/etudiant/enseignements-d-ouverture-optionnels.html", {
            "meta": utils.metadata("Enseignements d'ouverture optionnels (E2O)", User.a_baumard(), "2024-01-16", "63cab520-d615-45d0-b6f7-63b5ed51c9e5",
                                   subject="Enseignements d'ouverture optionnels, e2o")
        })

def entreprise(request):
    return render(request, "vous-etes/entreprise/index.html")

def journaliste(request):
    return render(request, "vous-etes/journaliste/index.html", {
            "meta": utils.metadata("Espace presse", User.c_paquereau(), "2022-02-24", "250e12ac-85ef-466b-887e-36493f2960da",
                                   subject="contacts presse, journalistes, relations presse université, interview, reportage")
        })

def jo_communiques(request):
    return render(request, "vous-etes/journaliste/communiques.html")

def jo_dossiers_de_presse(request):
    return render(request, "vous-etes/journaliste/dossiers-de-presse.html", {
            "meta": utils.metadata("Dossiers de presse thématiques", User.n_calvez(), "2024-09-16", "54dd10b5-247c-4aed-bdd3-eb042c08ab65")
        })