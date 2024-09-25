from django.shortcuts import render
from .. import utils
from ..helpers.User import User

# Create your views here.
def home(request):
    return render(request, "recherche/index.html")

def etudes_doctorales_et_hdr(request):
    return render(request, "recherche/etudes-doctorales-et-hdr.html", {
            "meta": utils.metadata("Études doctorales et HDR", User.c_paquereau(), "2023-12-18", "0cebd3a0-9ad2-439f-bfdd-c761c1ea5454")
        })