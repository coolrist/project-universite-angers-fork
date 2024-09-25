def metadata(title, contributor, date, identifier, creator = "", publisher = "", type = "Text", format = "text/html", language = "fr", coverage = "fr", **kwargs):
    """
    This function return the metadata (title, contributor, date, identifier, type, format, language, converage...) of a page to the view.
    """
    meta = {
        "title": title,
        "creator": f"{creator}#utilisateurs-ldap" if creator else "",
        "publisher": f"{publisher}#utilisateurs-ldap" if publisher else "",
        "contributor": f"{contributor}#utilisateurs-ldap",
    }
    meta.update(kwargs)
    meta.update({
        "date": date,
        "type": type,
        "format": format,
        "identifier": f"defaultWebContent://{identifier}",
        "language": language,
        "coverage": coverage,
    })
    return meta