// src/utils/translations.ts

export const dictionary = {
  en: {
    // ... keep all existing keys ...
    welcomeTitle: "Senegalese Association for Local Development (ASDL)",
    welcomeSubtitle: "Empowering communities through sustainable development and strategic action.",
    strategicAxesTitle: "Our Strategic Axes",
    strategicAxesSubtitle: "The core pillars defining our mission and operational focus.",
    learnMore: "Learn more",
    unableToLoad: "Unable to load Strategic Axes",
    backHome: "Back to Home",
    statusLabel: "Status",
    detailedObjective: "Detailed Objective",
    supportCauseTitle: "Want to support this cause?",
    supportCauseText: "Your contribution can help us achieve our goals in",
    contactUs: "Contact Us About This",
    nav: {
      home: "Home",
      about: "About Us",
      projects: "Projects",
      donate: "Donate / Contact"
    },
    status: {
      active: "Active",
      completed: "Completed",
      planned: "Planned"
    },
    about: {
      heroTitle: "About ASDL",
      heroSubtitle: "Dedicated to the sustainable development of Senegal since our inception.",
      missionTitle: "Our Mission",
      missionText: "To identify, design, and implement structuring projects that improve the living conditions of vulnerable populations while preserving our ecosystem.",
      visionTitle: "Our Vision",
      visionText: "A Senegal where every community possesses the tools, knowledge, and autonomy to build its own sustainable prosperity.",
      valuesTitle: "Our Core Values",
      values: {
        solidarity: "Solidarity",
        transparency: "Transparency",
        inclusion: "Inclusion",
        excellence: "Excellence"
      },
      teamTitle: "Our Leadership",
      teamSubtitle: "A multidisciplinary team committed to impactful action."
    },
    // NEW CONTACT SECTION
    contact: {
      heroTitle: "Contact & Support",
      heroSubtitle: "Join us in making a difference. Whether you want to volunteer, partner, or donate.",
      formTitle: "Send us a message",
      form: {
        name: "Full Name",
        email: "Email Address",
        subject: "Subject",
        message: "Message",
        submit: "Send Message"
      },
      infoTitle: "Contact Information",
      address: "Dakar, Senegal",
      donateTitle: "Make a Donation",
      donateText: "Your financial support directly funds our initiatives in education, health, and environment.",
      bankDetails: "Bank Transfer Details",
      mobileMoney: "Mobile Money (Wave/Orange)"
    }
  },
  fr: {
    // ... keep all existing keys ...
    welcomeTitle: "Association Sénégalaise pour le Développement Local (ASDL)",
    welcomeSubtitle: "Autonomiser les communautés par le développement durable et l'action stratégique.",
    strategicAxesTitle: "Nos Axes Stratégiques",
    strategicAxesSubtitle: "Les piliers fondamentaux définissant notre mission et notre action.",
    learnMore: "En savoir plus",
    unableToLoad: "Impossible de charger les Axes Stratégiques",
    backHome: "Retour à l'accueil",
    statusLabel: "Statut",
    detailedObjective: "Objectif Détaillé",
    supportCauseTitle: "Vous souhaitez soutenir cette cause ?",
    supportCauseText: "Votre contribution peut nous aider à atteindre nos objectifs dans le domaine :",
    contactUs: "Contactez-nous",
    nav: {
      home: "Accueil",
      about: "À propos",
      projects: "Projets",
      donate: "Faire un don / Contact"
    },
    status: {
      active: "Actif",
      completed: "Terminé",
      planned: "Planifié"
    },
    about: {
      heroTitle: "À propos de l'ASDL",
      heroSubtitle: "Dédiés au développement durable du Sénégal depuis notre création.",
      missionTitle: "Notre Mission",
      missionText: "Identifier, concevoir et mettre en œuvre des projets structurants qui améliorent les conditions de vie des populations vulnérables tout en préservant notre écosystème.",
      visionTitle: "Notre Vision",
      visionText: "Un Sénégal où chaque communauté possède les outils, le savoir et l'autonomie pour bâtir sa propre prospérité durable.",
      valuesTitle: "Nos Valeurs Fondamentales",
      values: {
        solidarity: "Solidarité",
        transparency: "Transparence",
        inclusion: "Inclusion",
        excellence: "Excellence"
      },
      teamTitle: "Notre Leadership",
      teamSubtitle: "Une équipe pluridisciplinaire engagée pour une action impactante."
    },
    // NEW CONTACT SECTION
    contact: {
      heroTitle: "Contact & Soutien",
      heroSubtitle: "Rejoignez-nous pour faire la différence. Que vous souhaitiez devenir bénévole, partenaire ou faire un don.",
      formTitle: "Envoyez-nous un message",
      form: {
        name: "Nom complet",
        email: "Adresse e-mail",
        subject: "Sujet",
        message: "Message",
        submit: "Envoyer le message"
      },
      infoTitle: "Coordonnées",
      address: "Dakar, Sénégal",
      donateTitle: "Faire un don",
      donateText: "Votre soutien financier finance directement nos initiatives en éducation, santé et environnement.",
      bankDetails: "Détails Virement Bancaire",
      mobileMoney: "Mobile Money (Wave/Orange)"
    }
  }
};

export type Language = 'en' | 'fr';