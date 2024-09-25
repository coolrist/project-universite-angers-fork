from django.shortcuts import render
from .. import utils
from ..helpers.User import User

# Create your views here.
def home(request):
    return render(request, "international/index.html")

def venir_a_l_ua(request):
    return render(request, "international/venir-a-l-universite.html", {
            "meta": utils.metadata("Bienvenue à l'UA", User.h_beaumatin(), "2024-05-28", "5957fc0e-276f-47b4-b41d-81446d8ece90")
        })