$(".panneau").click(function () {

  $(this).toggleClass("togglePanneau");
  $(this).children().next().children("*").toggleClass("toggleDescription");
});

/* ------------------------------------------------------------------------ */

var docHeight = $(document).height();
var carteHeight = $(".carte").next().height();


$(window).scroll(function () {

  if ($(window).scrollTop() + $(window).height() >= docHeight - (carteHeight*2)) {

    $(".carte").addClass("carteTransform");

  }else{

    $(".carte").removeClass("carteTransform");

  }
  
});


$(window).scroll(function () {

  if ($(window).scrollTop() + $(window).height() >= docHeight - (carteHeight/1.2)) {

    $(".carte2").addClass("carteTransform");

  }else{

    $(".carte2").removeClass("carteTransform");

  }
  
});
 
/* ------------------------------------------------------------------------ */

$(".right").click(function(){

  var imgNow = $(this).closest("div").find(".active");
  var imgNext = imgNow.next();

  if(imgNext.length){

      imgNow.removeClass("active");
      imgNext.addClass("active");
      
  }else{

      imgNow.removeClass("active");
      imgNow.parent().children().first().addClass("active");

  }
  console.log(imgNext);
});


$(".left").click(function(){

  var imgNow = $(this).closest("div").find(".active");
  var imgPrev = imgNow.prev();

  if(imgPrev.length){

      imgNow.removeClass("active");
      imgPrev.addClass("active");
          
  }else{

      imgNow.removeClass("active");
      imgNow.parent().children().last().addClass("active");

  }


});

/* ------------------------------------------------------------------------ */

var compteur = 0;

$(".addPlus").click(function () {

  var inputValue = $(this).siblings("input").val();

  parseInt(inputValue ++);

  $(this).siblings("input").val(inputValue);

});

$(".removeMinus").click(function () {

  var inputValue = $(this).siblings("input").val();

  if (inputValue > 1) {

    parseInt(inputValue--);

    $(this).siblings("input").val(inputValue);

  }

});

/* ------------------------------------------------------------------------ */

var produits = [
    ["Vinyle", 1666],
    ["CD", 6.66],
    ["T-Shirt", 42],
    ["Place de Concert", 9001]
  ]; 
var panier = [];

$(".btnCartes").click(function () {

  $(".tablePanier").addClass("visible");
  $(".panierVide").removeClass("visible");

  var idProduit = $(this).attr("id"),
      produit = produits[idProduit];

  var nom = produit[0],
      prixUnitaire = produit[1],
      valeurDuChamp = $(this).next().find(".champQuantite").val(),
      quantite = parseInt(valeurDuChamp);
      sousTotal = prixUnitaire * quantite;

  var produitPanier = [nom, prixUnitaire, quantite, sousTotal];

  var premierAchat = true;

  for (var i = 0; i < panier.length; i++) {

    var elementEnCours = panier[i];

    if (elementEnCours.includes(nom)) {

      premierAchat = false;

      var ancienneQuantite = elementEnCours[2],
          nouvelleQuantite = ancienneQuantite + quantite,
          nouveauSousTotal = nouvelleQuantite * prixUnitaire;

      elementEnCours[2] = nouvelleQuantite,
      elementEnCours[3] = nouveauSousTotal;

      panier[i] = elementEnCours;

    }

  }

  if (premierAchat) {

    panier.push(produitPanier);

  }

  fillTable(panier);

});

function fillTable(tableau){

  $(".tBody").html("");

  for(var i = 0; i < tableau.length; i++){

    $(".tBody").html($(".tBody").html() + "<tr><td>" 
    + tableau[i][0] + "</td><td>" 
    + tableau[i][1] + "€</td><td>"
    + tableau[i][2] + "</td><td>"
    + tableau[i][3] + "€</td><td>"   + "</td></tr>");

  }

}

/* ------------------------------------------------------------------------ */

$(".viderPanier").click(function(){

  panier = [];
  $(".tablePanier").html("<thead><th>Nom de l'article</th><th>Prix Unitaire</th><th>Quantité</th><th>Sous-Total</th></thead><tbody class='tBody'></tbody>");
  $(".tablePanier").removeClass("visible");
  $(".panierVide").addClass("visible");

});

/* ------------------------------------------------------------------------ */

window.addEventListener('scroll',stickIt);

var navbar = $(".navbar").height();

function stickIt(){

    if(window.scrollY>=navbar){

        $(".navbar").addClass("navbar-fixe");
        $(".contFldBg").addClass("panneauxFix");

    }else{

        $(".navbar").removeClass("navbar-fixe");
        $(".contFldBg").removeClass("panneauxFix");

    }

}