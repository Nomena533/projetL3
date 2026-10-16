import { Link } from "react-router-dom";

export function LogoVert() {

  return (
    <Link to="/" className="group flex items-center gap-3 shrink-0" aria-label="Kalon'ny — Accueil">
      {/* Ne marche pas */}
      {/* <img src="../assets/logo/logoVert.png" alt="Logo 2AM" srcset="" /> */}

      {/* Solution : 
          1- Mettre l'image dans le dossier public et src deviendra src="/logo/logoVert.png"
          2- Si elle est dans ../assets/logo/logoVert.png, on fait une import logoVert from "../assets/logo/logoVert.png" et src deviendra src={logovert}
      */}
      <img src="/logo/logoVert.png" alt="Logo 2AM" srcset="" width={"150px"}/>
    </Link>
  );
}

export function LogoBlanc({width = "150px"}) {
  return (
    <Link to="/" className="group flex items-center gap-3 shrink-0" aria-label="Kalon'ny — Accueil">
      {/* Ne marche pas */}
      {/* <img src="../assets/logo/logoVert.png" alt="Logo 2AM" srcset="" /> */}
  
      {/* Solution : 
          1- Mettre l'image dans le dossier public et src deviendra src="/logo/logoVert.png"
          2- Si elle est dans ../assets/logo/logoVert.png, on fait une import logoVert from "../assets/logo/logoVert.png" et src deviendra src={logovert}
      */}
      <img src="/logo/logoBlanc.png" alt="Logo 2AM" srcset="" width={width}/>
    </Link>
  );
}
