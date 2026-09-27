/* Coordonnées révélées au clic : rien n'est décodé au chargement. */
(function () {
  document.querySelectorAll('[data-contact]').forEach(function (bloc) {
    bloc.setAttribute('aria-live', 'polite');
  });

  function texte(codes) {
    return String.fromCharCode.apply(null, codes);
  }

  function lien(adresse) {
    var a = document.createElement('a');
    a.href = 'mailto:' + adresse;
    a.textContent = adresse;
    return a;
  }

  function ligne(parent, valeur) {
    var li = document.createElement('li');
    if (typeof valeur === 'string') li.textContent = valeur;
    else li.appendChild(valeur);
    parent.appendChild(li);
  }

  function reveler(bouton) {
    var bloc = bouton.closest('[data-contact]');
    if (!bloc || bouton.getAttribute('aria-expanded') === 'true') return;

    var nom = texte([84, 104, 111, 109, 97, 115, 32, 76, 101, 100, 111, 117, 120]);
    var rue = texte([67, 104, 101, 109, 105, 110, 32, 112, 114, 232, 115, 32, 100, 117, 32, 109, 97, 114, 103, 117, 105, 108, 108, 101, 114, 32, 50, 52]);
    var ville = texte([49, 50, 55, 51, 32, 65, 114, 122, 105, 101, 114, 45, 108, 101, 45, 77, 117, 105, 100, 115]);
    var pays = texte([83, 117, 105, 115, 115, 101]);
    var courriel = texte([98, 101, 97, 117, 98, 101, 98, 111, 98, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109]);
    var mode = bloc.getAttribute('data-contact');
    var zone = document.createElement(mode === 'pied' ? 'ul' : mode === 'email' ? 'span' : 'p');

    zone.className = 'contact__revele';

    if (mode === 'email') {
      zone.appendChild(lien(courriel));
    } else if (mode === 'pied') {
      ligne(zone, nom);
      ligne(zone, rue);
      ligne(zone, ville);
      ligne(zone, lien(courriel));
    } else {
      zone.appendChild(document.createTextNode(nom));
      zone.appendChild(document.createElement('br'));
      zone.appendChild(document.createTextNode(rue));
      zone.appendChild(document.createElement('br'));
      zone.appendChild(document.createTextNode(ville + ', ' + pays));
      zone.appendChild(document.createElement('br'));
      zone.appendChild(lien(courriel));
    }

    zone.id = 'c' + Math.random().toString(36).slice(2, 8);
    bouton.setAttribute('aria-controls', zone.id);
    bouton.setAttribute('aria-expanded', 'true');
    bouton.hidden = true;
    bloc.appendChild(zone);
    zone.querySelector('a').focus();
  }

  document.addEventListener('click', function (event) {
    var bouton = event.target.closest('.contact__btn');
    if (!bouton) return;
    reveler(bouton);
  });
})();
