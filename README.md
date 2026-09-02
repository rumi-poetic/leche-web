# leche-web

Site vitrine de **Lèche**, l'extension Chrome qui fait défiler les catalogues tout seuls.

Dépôt **public** parce que GitHub Pages ne publie que depuis un dépôt public sur le plan
gratuit. Le code de l'extension reste dans son dépôt privé.

Cinq langues : français, anglais, italien, espagnol, chinois. Quatre pages par langue.

---

## Modifier le contenu

**Tout le texte vit dans `build.py`.** On corrige une phrase à un seul endroit, on relance le
script, les vingt-deux pages sont régénérées de façon cohérente.

```bash
python3 build.py
```

Aucune dépendance, rien à installer. Le HTML produit est committé : GitHub Pages sert des
fichiers statiques, le script ne tourne jamais en ligne.

N'édite pas les `.html` à la main — la prochaine génération écraserait la modification.
Seules exceptions : `styles.css` et le contenu de `assets/`.

---

## À remplir avant de vendre

En haut de `build.py` :

| Constante | État |
|---|---|
| `LIEN_STORE` | **à remplacer** dès que la fiche est validée |
| `DOMAINE` | à changer si tu prends un domaine personnalisé |
| `EMAIL` | ✅ `lindabeji2@gmail.com` |
| `EDITEUR` | ✅ Linda Beji, Chemin près du marguiller 24, 1273 Arzier-le-Muids |
| `DATE_EFFET` | ✅ 2026-09-02 — à remonter à chaque modification des textes légaux |
| `PRIX` | ✅ 5 CHF — apparaît aussi dans `assets/og.jpg`, à régénérer si tu changes |

Le script signale en fin d'exécution combien de fichiers contiennent encore
`LIEN_CHROME_WEB_STORE`.

---

## La vidéo

L'emplacement est prêt, section `#video`, dans les cinq langues. Le bloc à remplacer se trouve
dans `build.py`, fonction `page_index`, pas dans les fichiers HTML.

```html
<!-- YouTube, sans cookie -->
<div class="video">
  <iframe src="https://www.youtube-nocookie.com/embed/ID_DE_LA_VIDEO"
          title="Lèche" allowfullscreen loading="lazy"></iframe>
</div>

<!-- ou fichier hébergé ici -->
<div class="video">
  <video src="{b}assets/demo.mp4" poster="{b}assets/demo-poster.jpg"
         controls playsinline preload="none"></video>
</div>
```

`{b}` est le préfixe relatif vers la racine : il vaut `""` en français et `"../"` dans les
autres langues. Garde-le, sinon la vidéo casse dans quatre langues sur cinq.

**Un `.mp4` déposé dans `assets/` préserve la promesse « aucune requête tierce » du pied de
page. Si tu passes par YouTube, retire cette mention** (clé `pied_note` dans les cinq
dictionnaires) — mieux vaut une promesse en moins qu'une promesse fausse.

**Deux formats à demander en une fois** : 9:16 pour Instagram, 16:9 pour le site. C'est le
même montage.

---

## Les quatre URLs que la review croise

| Page | Rôle |
|---|---|
| `index.html` | `homepage_url` du manifest et de la fiche |
| `privacy.html` | politique de confidentialité — champ obligatoire du dashboard |
| `support.html` | adresse de contact qui répond |
| `terms.html` | conditions de vente, renonciation au droit de rétractation, remboursement |

**La politique de confidentialité et l'onglet Privacy Practices du dashboard Google doivent
dire exactement la même chose.** Une divergence entre les deux est un motif de rejet courant.
Le tableau de `privacy.html` reprend les quatre catégories à déclarer : réglages, sites appris,
indicateur de session, e-mail et paiement. Garde la page ouverte pendant que tu remplis le
formulaire.

---

## Déploiement

1. Pousse sur `main`.
2. `Settings` → `Pages` → *Source*: **Deploy from a branch**, branche `main`, dossier
   `/ (root)`.
3. En ligne sur `https://rumi-poetic.github.io/leche-web/`.

### Domaine personnalisé

Chez le registrar, quatre enregistrements `A` vers `185.199.108.153`, `185.199.109.153`,
`185.199.110.153`, `185.199.111.153`, plus un `CNAME` `www` vers `rumi-poetic.github.io`.
Puis `Settings` → `Pages` → *Custom domain*, et **Enforce HTTPS** une fois le certificat émis.

Pense à mettre `DOMAINE` à jour dans `build.py` et à relancer le script : les balises
`canonical`, `hreflang` et `og:url` en dépendent.

---

## Structure

```
leche-web/
├── build.py                générateur — tout le texte est ici
├── styles.css              palette reprise du panneau de l'extension
├── index.html              français (langue par défaut, servie à la racine)
├── privacy.html
├── terms.html
├── support.html
├── confidentialite.html    redirection vers privacy.html (ancienne adresse)
├── conditions.html         redirection vers terms.html (ancienne adresse)
├── en/  it/  es/  zh/      mêmes quatre pages par langue
├── .nojekyll
└── assets/
    ├── leche.svg                    logo, tracé identique à celui du plugin
    ├── favicon.svg
    ├── og.jpg                       aperçu des partages (1200×630)
    ├── capture-panneau.jpg
    ├── capture-pastille.jpg
    └── capture-apprentissage.jpg
```

Prévisualisation locale : `python3 -m http.server` à la racine, puis
`http://localhost:8000`.

---

## Cohérence à maintenir

**Les langues du site et celles de l'extension ne coïncident pas.** L'extension parle français,
anglais, **portugais**, espagnol et chinois ; le site parle français, anglais, **italien**,
espagnol et chinois. Deux options : ajouter l'italien à l'extension, ou remplacer l'italien par
le portugais ici. En l'état, un visiteur italien lit le site dans sa langue puis découvre une
extension qui ne la parle pas.

**Les couleurs viennent du plugin** : `#230F1C`, `#F43F6E`, `#FFE2EA`, `#FDEFF3`, `#BC1948`.
Si elles changent dans l'extension, elles changent ici — c'est le même produit.

**Les captures** montrent Lèche sur une boutique réelle. Usage habituel pour ce type de
produit, mais les visuels produits en arrière-plan appartiennent à la boutique et aux marques.
Recadrer sur le panneau et la pastille règle la question. Cela vaut aussi pour les captures de
la fiche du Chrome Web Store.
