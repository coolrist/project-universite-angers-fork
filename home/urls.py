from django.urls import path, include
from .views import formationsViews, homeViews, internationalViews, rechercheViews, universiteViews, vieCampusViews, vousEtesViews

urlpatterns = [
    path("", homeViews.home, name="home"),
    path("vous-etes/", include(
        ([
            path("futur-etudiant/", include(
                ([
                    path("", vousEtesViews.futur_etudiant, name="index"),
                    path("decouvrir-l-universite/", vousEtesViews.fe_decouvrir_l_universite, name="decouvrir-l-universite"),
                    path("choisir-sa-formation/", vousEtesViews.fe_choisir_sa_formation, name="choisir-sa-formation"),
                    path("candidater/", vousEtesViews.fe_candidater, name="candidater"),
                    path("infos-pratiques/", vousEtesViews.fe_infos_pratiques, name="infos-pratiques")
                ], "futur-etudiant")
            )),
            path("etudiant/", include(
                ([
                    path("", vousEtesViews.etudiant, name="index"),
                    path("carte-pass-sup/", vousEtesViews.et_carte_pass_sup, name="carte-pass-sup"),
                    path("scolarite/", vousEtesViews.et_scolarite, name="scolarite"),
                    path("stages/", vousEtesViews.et_stages, name="stages"),
                    path("examens/", vousEtesViews.et_examens, name="examens"),
                    path("kit-numerique/", vousEtesViews.et_kit_numerique, name="kit-numerique"),
                    path("bourses-et-aides/", vousEtesViews.et_bourses_et_aides, name="bourses-et-aides"),
                    path("enseignements-d-ouverture-optionnels/", vousEtesViews.et_enseignements_d_ouverture_optionnels, name="e2o")
                ], "etudiant")
            )),
            path("entreprise/", include(
                ([
                    path("", vousEtesViews.entreprise, name="index"),
                ], "entreprise")
            )),
            path("journaliste/", include(
                ([
                    path("", vousEtesViews.journaliste, name="index"),
                    path("communiques/", vousEtesViews.jo_communiques, name="communiques"),
                    path("dossiers-de-presse/", vousEtesViews.jo_dossiers_de_presse, name="dossiers-de-presse")
                ], "journaliste")
            ))
        ], "vous-etes")
    )),
    path("universite/", include(
        ([
            path("", universiteViews.home, name="index"),
            path("qui-sommes-nous/", include(
                ([
                    path("nos-missions-et-nos-valeurs/", universiteViews.qs_nos_missions_et_nos_valeurs, name="nos-missions-et-nos-valeurs"),
                ], "qui-sommes-nous")
            )),
            path("fonctionnement/", include(
                ([
                    path("organigramme/", universiteViews.fn_organigramme, name="organigramme"),
                ], "fonctionnement")
            )),
            path("strategies-et-grands-projets/", include(
                ([
                    path("", universiteViews.strategies_et_grands_projets, name="index"),
                ], "strategies-et-grands-projets")
            )),
            path("les-chantiers-de-l-ua/", include(
                ([
                    path("", universiteViews.les_chantiers_de_l_ua, name="index"),
                ], "les-chantiers-de-l-ua")
            )),
            path("travailler-a-l-ua/", include(
                ([
                    path("", universiteViews.travailler_a_l_ua, name="index"),
                    path("enseignants-enseignants-chercheurs/", universiteViews.tua_enseignants_enseignants_chercheurs, name="enseignants")
                ], "travailler-a-l-ua")
            )),
            path("hrs4r/", include(
                ([
                    path("", universiteViews.hrs4r, name="index"),
                ], "hrs4r")
            ))
        ], "universite")
    )),
    path("recherche/", include(
        ([
            path("", rechercheViews.home, name="index"),
            path("etudes-doctorales-et-hdr/", rechercheViews.etudes_doctorales_et_hdr, name="etudes-doctorales-et-hdr"),
        ], "recherche")
    )),
    path("formations/", include(
        ([
            path("", formationsViews.home, name="index"),
            path("etre-accompagne-et-conseille/", formationsViews.fo_etre_accompagne_et_conseille, name="etre-accompagne-et-conseille")
        ], "formations")
    )),
    path("international/", include(
        ([
            path("", internationalViews.home, name="index"),
            path("venir-a-l-universite/", internationalViews.venir_a_l_ua, name="venir-a-l-ua"),
        ], "international")
    )),
    path("vie-des-campus/", include(
        ([
            path("", vieCampusViews.home, name="index"),
        ], "vie-des-campus")
    ))   
]