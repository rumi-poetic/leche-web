# leche-web

Site vitrine de **Lèche**, l'extension Chrome qui fait défiler les catalogues tout seuls.

Ce dépôt est **public** parce que GitHub Pages ne publie que depuis un dépôt public sur le plan
gratuit. Il ne contient que le site : le code de l'extension reste dans son dépôt privé.

---

## Ce qu'il faut remplacer avant de publier

Cherche ces chaînes dans tout le dépôt et remplace-les partout. Tant qu'il en reste une, le site
n'est pas prêt.

```bash
grep -rn "REMPLACER-PAR-VOTRE-DOMAINE\|LIEN_CHROME_WEB_STORE\|NOM_OU_RAISON_SOCIALE\|ADRESSE_COMPLETE\|CODE_POSTAL VILLE\|CONTACT@\|DATE_A_REMPLACER\|NUMERO_TVA_OU_IDE_SI_APPLICABLE" .
```

| Marqueur | Remplacer par |
|---|---|
| `REMPLACER-PAR-VOTRE-DOMAINE` | ton domaine, sans `https://` (ex. `leche.app`) |
| `LIEN_CHROME_WEB_STORE` | l'URL de la fiche, disponible après validation |
| `NOM_OU_RAISON_SOCIALE` | ton nom ou celui de la structure |
| `ADRESSE_COMPLETE`, `CODE_POSTAL VILLE` | l'adresse de l'éditeur |
| `CONTACT@…` | l'adresse de contact |
| `DATE_A_REMPLACER` | la date de mise en ligne, format `2026-09-15` |
| `NUMERO_TVA_OU_IDE_SI_APPLICABLE` | numéro IDE / TVA, ou supprimer la ligne |

La vérification « trader » du Chrome Web Store rend ton nom et ton adresse publics de toute
façon. Les faire figurer ici est cohérent, et ça rassure quelqu'un qui arrive d'Instagram et
s'apprête à payer.

---

## Déploiement sur GitHub Pages

1. Crée le dépôt **public** `leche-web` et pousse ce contenu sur `main`.
2. `Settings` → `Pages` → *Source*: **Deploy from a branch**, branche `main`, dossier `/ (root)`.
3. Attends une minute : le site est en ligne sur `https://<compte>.github.io/leche-web/`.

### Domaine personnalisé

1. Achète le domaine, puis chez le registrar crée quatre enregistrements `A` vers
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   (et un `CNAME` `www` vers `<compte>.github.io`).
2. `Settings` → `Pages` → *Custom domain* : saisis le domaine. GitHub crée le fichier `CNAME`.
3. Coche **Enforce HTTPS** une fois le certificat émis.

Une URL `github.io` sur une fiche de store payante fait amateur. Le domaine coûte une quinzaine
de francs par an, prends-le.

Le fichier `.nojekyll` évite que GitHub ne passe le site dans Jekyll : rien à compiler ici.

---

## Ajouter la vidéo

Dans `index.html`, section `#video`, remplace le bloc `<div class="video">` :

```html
<!-- YouTube, sans cookie -->
<div class="video">
  <iframe src="https://www.youtube-nocookie.com/embed/ID_DE_LA_VIDEO"
          title="Lèche en action" allowfullscreen loading="lazy"></iframe>
</div>

<!-- ou fichier hébergé ici -->
<div class="video">
  <video src="assets/demo.mp4" poster="assets/demo-poster.jpg"
         controls playsinline preload="none"></video>
</div>
```

Un `.mp4` hébergé dans le dépôt garde la promesse « aucune requête tierce » du pied de page.
Si tu passes par YouTube, retire cette mention.

**Format** : la vidéo d'Instagram est verticale (9:16), celle du site est horizontale (16:9).
Demande les deux exports d'un coup, c'est le même montage.

---

## Structure

```
leche-web/
├── index.html              page produit
├── confidentialite.html    politique de confidentialité (FR)
├── privacy.html            politique de confidentialité (EN) — celle que Google lit
├── conditions.html         conditions de vente et remboursement
├── styles.css              palette reprise du panneau de l'extension
├── .nojekyll
└── assets/
    ├── leche.svg                    logo, tracé identique à celui du plugin
    ├── favicon.svg
    ├── og.jpg                       aperçu des partages (1200×630)
    ├── capture-panneau.jpg          le panneau pendant le défilement
    ├── capture-pastille.jpg         la pastille repliée, déplaçable
    └── capture-apprentissage.jpg    le mode apprentissage
```

Aucune dépendance, aucun build, aucun script. Ouvre `index.html` dans un navigateur pour
prévisualiser, ou lance `python3 -m http.server` à la racine.

---

## Cohérence à maintenir

**La politique de confidentialité et la déclaration d'usage des données du dashboard Google
doivent dire exactement la même chose.** Une divergence entre les deux est un motif de rejet
courant. Quand tu remplis le formulaire Google, garde `privacy.html` ouvert à côté.

Les couleurs viennent du plugin : `#230F1C`, `#F43F6E`, `#FFE2EA`, `#FDEFF3`, `#BC1948`. Si tu
les changes dans l'extension, change-les ici — c'est le même produit.

Le prix apparaît dans `index.html` (deux fois), `conditions.html` et l'image `og.jpg`. Si tu
passes de 5 à 12 CHF, régénère aussi l'aperçu de partage.

---

## Captures d'écran

Les captures montrent l'extension en fonctionnement sur un site marchand réel. C'est l'usage
habituel pour ce type de produit, mais les visuels produits qui apparaissent à l'arrière-plan
appartiennent à la boutique et aux marques concernées. Deux options si tu veux être tranquille :
recadrer sur le panneau et la pastille, ou refaire les captures sur une boutique dont tu as
l'accord. Cela vaut aussi pour les captures de la fiche du Chrome Web Store.
# leche-web
