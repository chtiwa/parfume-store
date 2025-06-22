import { FiTruck, FiStar, FiCreditCard, FiHeadphones } from "react-icons/fi"

const Services = () => {
  const services = [
    {
      title: "Livraison Rapide, de 24h à 48h max.",
      icon: FiTruck,
      description:
        "Recevez vos parfums directement chez vous en un temps record, partout en Algérie."
    },
    {
      title: "Parfums de Qualité Supérieure",
      icon: FiStar,
      description:
        "Nous sélectionnons des fragrances raffinées, durables et inspirées des plus grandes marques."
    },
    {
      title: "Paiement à la Livraison",
      icon: FiCreditCard,
      description:
        "Commandez en toute confiance et payez uniquement à la réception de votre colis."
    },
    {
      title: "Service Client Disponible",
      icon: FiHeadphones,
      description:
        "Notre équipe est à votre écoute 7j/7 pour répondre à vos questions ou vous conseiller."
    }
  ]

  return (
    <div className="flex flex-col gap-4 w-full px-8 sm:px-16 py-8 bg-gray-50 border-gray-300 border-t">
      <h3 className="font-bold text-xl sm:text-2xl text-center underline">
        Nos Services :
      </h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-center">
        {services.map((service, i) => {
          const { title, description, icon: Icon } = service
          return (
            <li className="flex flex-col gap-2" key={i}>
              <Icon className="text-2xl sm:text-3xl mt-1 w-full flex items-center justify-center " />
              <h3 className="font-semibold text-base">{title} </h3>
              <p className="text-gray-700 text-xs">{description} </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Services
