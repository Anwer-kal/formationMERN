import React from "react";
import { useLocation } from "react-router-dom";
import { Card } from "antd";

function Description() {
  const location = useLocation();
  const item = location.state?.item;

  if (!item) {
    return <h2>Pas de description disponible</h2>;
  }
  const renderRecipe = (id) => {
    switch (id) {
      case 1:
        return (
          <Card>
            <h2>Ingrédients :</h2>
            <ul>
              <li>250 g de pâtes</li>
              <li>1 boîte de tomates pelées (400 g)</li>
              <li>2 cuillères à soupe d'huile d'olive</li>
              <li>2 gousses d'ail émincées</li>
              <li>1 oignon (facultatif)</li>
              <li>Sel et poivre au goût</li>
              <li>1 cuillère à café de sucre (facultatif)</li>
              <li>Quelques feuilles de basilic frais ou séché</li>
              <li>Parmesan râpé (facultatif)</li>
            </ul>
            <h3>Instructions :</h3>
            <p>
              Cuisson des pâtes, préparation de la sauce tomate, puis mélangez et servez avec du parmesan.
            </p>
          </Card>
        );
      case 2:
        return (
          <>
            <h2>Ingrédients :</h2>
            <ul>
              <li>250 g de farine</li>
              <li>1 cuillère à café de levure de boulanger sèche</li>
              <li>1/2 cuillère à café de sel</li>
              <li>1 cuillère à soupe d'huile d'olive</li>
              <li>150 ml d'eau tiède</li>
              <li>1 cuillère à café de sucre</li>
            </ul>
            <h3>Instructions :</h3>
            <p>
              Préparez la pâte, garnissez-la de sauce tomate, mozzarella, puis faites cuire. Ajoutez du basilic pour servir.
            </p>
          </>
        );
      case 3:
        return (
          <>
            <h2>Ingrédients :</h2>
            <ul>
              <li>250 g de mascarpone</li>
              <li>3 œufs</li>
              <li>75 g de sucre</li>
              <li>1 cuillère à café d'extrait de vanille</li>
              <li>20 biscuits à la cuillère</li>
              <li>250 ml de café fort refroidi</li>
              <li>2 cuillères à soupe de rhum (facultatif)</li>
              <li>Cacao en poudre pour la décoration</li>
            </ul>
            <h3>Instructions :</h3>
            <p>
              Préparez la crème au mascarpone, imbibez les biscuits de café, alternez les couches de crème et biscuits, puis réfrigérez.
            </p>
          </>
        );
      case 4:
        return (
          <>
            <h2>Ingrédients :</h2>
            <ul>
              <li>1 tasse de farine tout usage</li>
              <li>2 cuillères à soupe de sucre</li>
              <li>2 cuillères à café de levure chimique</li>
              <li>1/4 de cuillère à café de sel</li>
              <li>1 tasse de lait</li>
              <li>1 œuf</li>
              <li>2 cuillères à soupe de beurre fondu</li>
              <li>1 cuillère à café d'extrait de vanille</li>
            </ul>
            <h3>Instructions :</h3>
            <p>
              Mélangez les ingrédients secs et humides, faites cuire les pancakes dans une poêle et servez avec des garnitures.
            </p>
          </>
        );
      default:
        return <p>Recette non trouvée.</p>;
    }
  };

  return (
    <div>
      <h1>{item.title}</h1>
      <img src={item.image} alt={item.title} width="300" />
      {renderRecipe(item.id)}
    </div>
  );
}

export default Description;




