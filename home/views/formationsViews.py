from django.shortcuts import render
from .. import utils
from ..helpers.User import User

# Create your views here.
def home(request):
    return render(request, "formations/index.html", {
            "meta": utils.metadata("Code", User.s_bouvier(), "2021-10-04", "8b52b11c-3da5-456a-b670-3c26b63e28ab")
        })

def fo_etre_accompagne_et_conseille(request):
    return render(request, "formations/etre-accompagne-et-conseille.html")