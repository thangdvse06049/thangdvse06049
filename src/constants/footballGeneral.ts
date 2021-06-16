import { find } from "lodash";

export const SENTENCES = {
  FINITION: [
    "La finition est très bien représentée dans ses compétences technique !",
    "La finition est bien représentée dans ses compétences technique !",
    "La finition est assez bien représentée dans ses compétences technique !",
    "La finition est assez peu représentée dans ses compétences technique !",
    "La finition est peu representée dans ses compétences technique !",
    "La finition ne fait pas partie de ses compétences technique !",
  ],
  goals: [
    "Excellent",
    "Bon",
    "Assez bon",
    "Assez mauvais",
    "Mauvais",
    "Médiocre",
  ],
  goalsEfficiency: [
    "Très Bonne",
    "Bonne",
    "Assez Bonne",
    "Assez Mauvaise",
    "Mauvaise",
    "Très Mauvaise",
  ],
  shots: [
    "Très Elevé",
    "Elevé",
    "Assez Elevé",
    "Assez Faible",
    "Faible",
    "Très Faible",
  ],
  shotsRatio: [
    "Excellente",
    "Bonne",
    "Assez bonne",
    "Assez mauvaise",
    "Mauvaise",
    "Médiocre",
  ],
  xgShot: [
    "Excellent",
    "Bon",
    "Assez bon",
    "Assez mauvais",
    "Mauvais",
    "Médiocre",
  ],
  headShotsRatio: [
    "Très Forte",
    "Forte",
    "Assez Forte",
    "Assez Faible",
    "Faible",
    "Très Faible",
  ],
  headShotsOnTarget: [
    "Excellente",
    "Bonne",
    "Assez Bonne",
    "Assez Mauvaise",
    "Mauvaise",
    "Médiocre",
  ],
  DISTRIBUTION: [
    "La proportion de passes techniques montre que la distribution est une qualité très présente chez le joueur  !",
    "La proportion de passes techniques montre que la distribution est une qualité bien présente chez le joueur  !",
    "La proportion de passes techniques montre que la distribution est une qualité assez présente chez le joueur  !",
    "La proportion de passes techniques montre que la distribution est une qualité assez peu présente chez le joueur  !",
    "La proportion de passes techniques montre que la distribution est une qualité peu présente chez le joueur  !",
    "La proportion de passes techniques montre que la distribution est une qualité très peu présente chez le joueur  !",
  ],
  passes: [
    "Très Importante",
    "Importante",
    "Assez Importante",
    "Assez Faible",
    "Faible",
    "Très Faible",
  ],
  successfulPasses: [
    "Technique de Passes Très Favorable",
    "Technique de Passes Favorable",
    "Technique de Passes Assez Favorable",
    "Technique de Passes Assez Défavorable",
    "Technique de Passes Défavorable",
    "Technique de Passes Trop Défavorable",
  ],
  receivedPass: [
    "Très souvent recherché dans le jeu.",
    "Souvent recherché dans le jeu.",
    "suffisamment recherché dans le jeu.",
    "Assez peu recherché dans le jeu.",
    "Peu recherché dans le jeu.",
    "Très peu recherché dans le jeu.",
  ],
  SmartPasses: [
    "Très Forte Créativité",
    "Forte Créativité",
    "Assez Forte Créativité",
    "Assez Faible Créativité",
    "Faible Créativité",
    "Très Faible Créativité",
  ],
  successfulSmartPasses: [
    "Technique de Passes Très Favorable",
    "Technique de Passes Favorable",
    "Technique de Passes Assez Favorable",
    "Technique de Passes Assez Défavorable",
    "Technique de Passes Défavorable",
    "Technique de Passes Trop Défavorable",
  ],
  passesToFinalThird: [
    "Très Importante",
    "Importante",
    "Assez Importante",
    "Assez Faible",
    "Faible",
    "Très Faible",
  ],
  successfulPassesToFinalThird: [
    "Technique de Passes Très Favorable",
    "Technique de Passes Favorable",
    "Technique de Passes Assez Favorable",
    "Technique de Passes Assez Défavorable",
    "Technique de Passes Défavorable",
    "Technique de Passes Trop Défavorable",
  ],
  throughPasses: [
    "Très Bonne Vision du Jeu",
    "Bonne Vision du Jeu",
    "Assez Bonne Vision du Jeu",
    "Assez Faible Vision du Jeu",
    "Faible Vision du Jeu",
    "Très Faible Vision du Jeu",
  ],
  successfulThroughPasses: [
    "Technique de Passes Très Favorable",
    "Technique de Passes Favorable",
    "Technique de Passes Assez Favorable",
    "Technique de Passes Assez Défavorable",
    "Technique de Passes Défavorable",
    "Technique de Passes Trop Défavorable",
  ],
  longPasses: [],
  successfulLongPasses: [
    "Technique de Passes Très Favorable",
    "Technique de Passes Favorable",
    "Technique de Passes Assez Favorable",
    "Technique de Passes Assez Défavorable",
    "Technique de Passes Défavorable",
    "Technique de Passes Trop Défavorable",
  ],
  progressivePasses: [
    "Très Forte Capacité de Projection",
    "Forte Capacité de Projection",
    "Assez Forte Capacité de Projection",
    "Assez Faible Capacité de Projection",
    "Faible Capacité de Projection",
    "Très Faible Capacité de Projection",
  ],
  successfulProgressivePasses: [
    "Technique de Passes Très Favorable",
    "Technique de Passes Favorable",
    "Technique de Passes Assez Favorable",
    "Technique de Passes Assez Défavorable",
    "Technique de Passes Défavorable",
    "Technique de Passes Trop Défavorable",
  ],
  secondThirdAssists: [
    "Très Grande Influcene",
    "Grande Influence",
    "Assez Grande Influence",
    "Assez Faible Influence",
    "Faible Influence",
    "Très Faible influence ",
  ],
  CREATION: [
    "La création est une compétence technique très valorisante chez le joueur !",
    "La création est une compétence technique valorisante chez le joueur !",
    "La création est une compétence technique assez valorisante chez le joueur !",
    "La création est une compétence technique assez peu valorisante chez le joueur !",
    "La création est une compétence technique peu valorisante chez le joueur !",
    "La création est une compétence technique très peu valorisante chez le joueur !",
  ],
  assists: [
    "Excellente Créativité & Vision du Jeu",
    "Bonne Créativité & Vision du Jeu",
    "Assez bonne Créativité & Vision du Jeu",
    "Assez Mauvaise Créativité & Vision du Jeu",
    "Mauvaise Créativité & Vision du Jeu",
    "Très Mauvaise Créativité & Vision du Jeu",
  ],
  shotAssists: [
    "Excellente Créativité & Vision du Jeu",
    "Bonne Créativité & Vision du Jeu",
    "Assez bonne Créativité & Vision du Jeu",
    "Assez Mauvaise Créativité & Vision du Jeu",
    "Mauvaise Créativité & Vision du Jeu",
    "Très Mauvaise Créativité & Vision du Jeu",
  ],
  keyPasses: [
    "Excellente Créativité & Vision du Jeu",
    "Bonne Créativité & Vision du Jeu",
    "Assez bonne Créativité & Vision du Jeu",
    "Assez Mauvaise Créativité & Vision du Jeu",
    "Mauvaise Créativité & Vision du Jeu",
    "Très Mauvaise Créativité & Vision du Jeu",
  ],
  successfulKeyPasses: [
    "Technique de Passes Très Favorable",
    "Technique de Passes Favorable",
    "Technique de Passes Assez Favorable",
    "Technique de Passes Assez Défavorable",
    "Technique de Passes Défavorable",
    "Technique de Passes Trop Défavorable",
  ],
  crosses: [
    "Trés Souvent Utilisé",
    "Souvent Utilisé",
    "Assez Souvent Utilisé",
    "Assez Peu Utilisé",
    "Peu Utilisé",
    "Très peu Utilisé",
  ],
  successfulCrosses: [
    "Technique de Centres Très Favorable",
    "Technique de Centres Favorable",
    "Technique de Centres Assez Favorable",
    "Technique de Centres Assez Défavorable",
    "Technique de Centres Défavorable",
    "Technique de Centres Trop Défavorable",
  ],
  DUELS: [
    "Sa volonté d' aller aux duels est largement mise en évidence dans ses statistiques !",
    "Sa volonté d' aller aux duels est mise en évidence dans ses statistiques !",
    "Sa volonté d' aller aux duels est assez mise en évidence dans ses statistiques !",
    "Sa volonté d' aller aux duels n'est pas assez mise en évidence dans ses statistiques !",
    "Sa volonté d' aller aux duels n'est pas mise en évidence dans ses statistiques !",
    "Sa volonté d' aller aux duels n'est pas du tout mise en évidence dans ses statistiques !",
  ],
  duels: [
    "Très Grande Présence",
    "Grande Présence",
    "Assez Grande Présence",
    "Assez Faible Présence",
    "Faible Présence",
    "Très Faible Présence",
  ],
  newDuelsWon: [
    "Taux de Réussite Très Gratifiant",
    "Taux de Réussite Gratifiant",
    "Taux de Réussite Assez Gratifiant",
    "Taux d'Echec Assez Pénalisant",
    "Taux d'Echec Pénalisant",
    "Très d'Echec Trop Pénalisant ",
  ],
  defensiveDuels: [
    "Très Grande Présence Physique",
    "Grande Présence Physique",
    "Assez Grande Présence Physique",
    "Assez Faible Présence Physique",
    "Faible Présence Physique",
    "Très Faible Présence Physique",
  ],
  newDefensiveDuelsWon: [
    "Taux de Réussite Très Gratifiant",
    "Taux de Réussite Gratifiant",
    "Taux de Réussite Assez Gratifiant",
    "Taux d'Echec Assez Pénalisant",
    "Taux d'Echec Pénalisant",
    "Très d'Echec Trop Pénalisant ",
  ],
  dribblesAgainst: [
    "Très Rarement Provoqué",
    "Rarement Provoqué",
    "Assez Rarement Provoqué",
    "Assez Souvent Provoqué",
    "Souvent Provoqué",
    "Très Souvent Provoqué",
  ],
  dribblesAgainstWon: [
    "Très Rarement Dribblé",
    "Rarement Dribblé",
    "Assez Rarement Dribblé",
    "Assez Souvent Dribblé",
    "Souvent Dribblé",
    "Très Souvent Dribblé",
  ],
  OffensiveDuels: [
    "Très Grande Présence",
    "Grande Présence",
    "Assez Grande Présence",
    "Assez Faible Présence",
    "Faible Présence",
    "Très Faible Présence",
  ],
  newOffensiveDuelsWon: [
    "Taux de Réussite Très Gratifiant",
    "Taux de Réussite Gratifiant",
    "Taux de Réussite Assez Gratifiant",
    "Taux d'Echec Assez Pénalisant",
    "Taux d'Echec Pénalisant",
    "Très d'Echec Trop Pénalisant ",
  ],
  dribbles: [
    "Niveau de Tentative Très Elevée",
    "Niveau de Tentative Elevée",
    "Niveau de Tentative Assez Elevée",
    "Niveau de Tentative Assez Faible",
    "Niveau de Tentative Faible",
    "Niveau de Tentative Très Faible",
  ],
  dribblesSuccessful: [
    "Technique de Dribbles Très Favorable",
    "Technique de Dribbles Favorable",
    "Technique de Dribbles Assez Favorable",
    "Technique de Dribbles Assez Défavorable",
    "Technique de Dribbles Défavorable",
    "Technique de Dribbles Trop Défavorable",
  ],
  aerialDuels: [
    "Très Grande Présence Aérienne",
    "Grande Présence Aérienne",
    "Assez Grande Présence Aérienne",
    "Assez Peu de Présence Aérienne",
    "Peu de Présence Aérienne",
    "Très Peu de Présence Aérienne",
  ],
  aerialDuelsWon: [
    "Très Bon Timing",
    "Bon Timing",
    "Assez Bon Timing",
    "Assez Mauvais Timing",
    "Mauvais Timing",
    "Très Mauvais Timing",
  ],
  slidingTackles: [
    "Trés Souvent Utilisé",
    "Souvent Utilisé",
    "Assez Souvent Utilisé",
    "Assez Peu Utilisé",
    "Peu Utilisé",
    "Très peu Utilisé",
  ],
  successfulSlidingTackles: [
    "Trés Bonne Maitrise Technique",
    "Bonne Maitrise Technique",
    "Assez Bonne Maitrise Technique",
    "Assez Mauvaise Maitrise Technique",
    "Mauvaise Maitrise Technique",
    "Très Mauvaise Maitrise Technique",
  ],
  looseBallDuels: [],
  successfulLooseBallDuels: [
    "Très Bon Engagement",
    "Bon Engagement",
    "Assez Bon Engagement",
    "Assez Peu d'Engagement",
    "Peu d'Engagement",
    "Très Peu d'Engagement",
  ],
  foulsSuffered: [
    "Subit Énormément de Fautes",
    "Subit Beaucoup de Fautes",
    "Subit Quelques Fautes",
    "Subit Assez Peu de Fautes",
    "Subit Peu de Fautes",
    "Subit Très Peu de Fautes",
  ],
  fouls: [
    "Commets Très Peu de Fautes",
    "Commets Peu de Fautes",
    "Commets Assez Peu de Fautes",
    "Commets un Peu Trop de Fautes",
    "Commets Trop de Fautes",
    "Commets Beaucoup Trop de Fautes",
  ],
  POSSESSION: [
    "Le ratio Récuperations Vs Pertes du ballon est tres largement en sa faveur !",
    "Le ratio Récuperations Vs Pertes du ballon est largement en sa faveur !",
    "Le ratio Récuperations Vs Pertes du ballon est suffisamment en sa faveur !",
    "Le ratio Récuperations Vs Pertes du ballon est légèrement en sa défaveur !",
    "Le ratio Récuperations Vs Pertes du ballon est largement en sa défaveur !",
    "Le ratio Récuperations Vs Pertes du ballon est très largement en sa défaveur !",
  ],
  interceptions: [
    "Très Bon Sens du Placement & de L' Anticipation",
    "Bon Sens du Placement & de L' Anticipation",
    "Assez Bon Sens du Placement & de L' Anticipation",
    "Assez Mauvais Sens du Placement & de L' Anticipation",
    "Mauvais Sens du Placement & de L' Anticipation",
    "Très Mauvais Sens du Placement & de L' Anticipation",
  ],
  recoveries: [
    "Excellent",
    "Bon",
    "Assez bon",
    "Assez mauvais",
    "Mauvais",
    "Médiocre",
  ],
  losses: [
    "Très Peu de Pertes",
    "Peu de Pertes",
    "Assez Peu de Pertes",
    "Un Peu Trop de Pertes",
    "Trop de Pertes",
    "Beaucoup Trop de Pertes",
  ],
  pressingDuels: [
    "Excellent Niveau Physique et Tactique",
    "Bon Niveau Physique et Tactique",
    "Assez Bon Niveau Physique et Tactique",
    "Assez Faible Niveau Physique et Tactique",
    "Faible Niveau Physique et Tactique",
    "Très Faible Niveau Physique et Tactique",
  ],
  counterpressingRecoveries: [
    "Très Agressif à la Perte du Ballon",
    "Agressif à la Perte du Ballon",
    "Suffisamment Agressif à la Perte du Ballon",
    "Assez Peu Agressif à la Perte du Ballon",
    "Peu Agressif à la Perte du Ballon",
    "Très Peu Agressif à la Perte du Ballon",
  ],
  opponentHalfRecoveries: [
    "Très Elevé",
    "Elevé",
    "Assez Elevé",
    "Assez Faible",
    "Faible",
    "Très Faible",
  ],
  dangerousOpponentHalfRecoveries: [
    "Très Elevé",
    "Elevé",
    "Assez Elevé",
    "Assez Faible",
    "Faible",
    "Très Faible",
  ],
  ownHalfLosses: [
    "Très Rare",
    "Rare",
    "Assez Rare",
    "Assez Fréquente",
    "Fréquente",
    "Trop Fréquente",
  ],
  dangerousOwnHalfLosses: [
    "Très Rare",
    "Rare",
    "Assez Rare",
    "Assez Fréquente",
    "Fréquente",
    "Trop Fréquente",
  ],
  missedBall: [
    "Très concentré - Il Loupe Très Peu de Ballon",
    "Concentré - Il Loupe Peu de Ballon",
    "Assez Concentré - Il Loupe Assez Peu de Ballon",
    "Assez Peu Concentré - Il Loupe Quelques Ballons",
    "Manque de Concentration - Il Loupe Trop de Ballons",
    "Gros Manque de Concentration - Il Loupe Beaucoup Trop de Ballons",
  ],
  PERCUSSION: [
    "Les qualités de percussion sont fortement présentes dans son style de jeu !",
    "Les qualités de percussion sont présentes dans son style de jeu !",
    "Les qualités de percussion sont assez présentes dans son style de jeu !",
    "Les qualités de percussion sont assez présentes dans son style de jeu !",
    "Les qualités de percussion sont peu présentes dans son style de jeu !",
    "Les qualités de percussion sont très peu présentes dans son style de jeu !",
  ],
  dribbles2: [
    "Très Grand Provocateur",
    "Grand Provocateur",
    "Suffisamment Provocateur",
    "Assez Peu Provocateur",
    "Peu Provocateur",
    "Très Peu Provocateur",
  ],
  dribblesSuccessful2: [
    "Très Bonne Capacité d'Elimination",
    "Bonne Capacité d'Elimination",
    "Assez Bonne Capacité d'Elimination",
    "Assez Faible Capacité d'Elimination",
    "Faible Capacité d'Elimination",
    "Très Faible Capacité d'Elimination",
  ],
  accelerations: [
    "Très Fréquente",
    "Fréquente",
    "Assez Fréquente",
    "Assez Rare",
    "Rare",
    "Très Rare",
  ],
  progressiveRun: [
    "Très Fréquente",
    "Fréquente",
    "Assez Fréquente",
    "Assez Rare",
    "Rare",
    "Très Rare",
  ],
  progressivePasses2: [
    "Très Fréquente",
    "Fréquente",
    "Assez Fréquente",
    "Assez Rare",
    "Rare",
    "Très Rare",
  ],
  successfulProgressivePasses2: [
    "Technique de Passes Très Favorable",
    "Technique de Passes Favorable",
    "Technique de Passes Assez Favorable",
    "Technique de Passes Assez Défavorable",
    "Technique de Passes Défavorable",
    "Technique de Passes Trop Défavorable",
  ],
  SET_PIECES: [
    "La qualité de ses coups de pieds arrêtés sont très favorable pour l'équipe ! ",
    "La qualité de ses coups de pieds arrêtés sont favorable pour l'équipe !",
    "La qualité de ses coups de pieds arrêtés sont assez favorable pour l'équipe !",
    "La qualité de ses coups de pieds arrêtés ne sont pas assez favorable pour l'équipe !",
    "La qualité de ses coups de pieds arrêtés sont peu favorable pour l'équipe !",
    "La qualité de ses coups de pieds arrêtés sont très peu favorable pour l'équipe !",
  ],
  directFreeKicksOnTarget: [
    "Très Bien Négociés",
    "Bien Négociés",
    "Assez Bien Négociés",
    "Assez Mal Négociés",
    "Mal Négociés",
    "Trés Mal Négociés",
  ],
  freeKicksOnTarget: [
    "Très Bien Négociés",
    "Bien Négociés",
    "Assez Bien Négociés",
    "Assez Mal Négociés",
    "Mal Négociés",
    "Trés Mal Négociés",
  ],
  corners: [
    "Très Bien Négociés",
    "Bien Négociés",
    "Assez Bien Négociés",
    "Assez Mal Négociés",
    "Mal Négociés",
    "Trés Mal Négociés",
  ],
};

export const LINK = {
  FINITION: {
    goals: ["goals"],
    goalsEfficiency: ["goalsEfficiency"],
    shots: ["shots"],
    shotsOnTarget: ["shotsOnTarget"],
    headShotsOnTarget: ["headShotsOnTarget"],
  },
  DISTRIBUTION: {
    groupPasses: ["groupPasses"],
    groupSmartPasses: ["groupSmartPasses"],
    groupThroughPasses: ["groupThroughPasses"],
    groupLongPasses: ["groupLongPasses"],
    groupForwardPasses: ["groupForwardPasses"],
    groupCrosses: ["groupCrosses"],
  },
  CREATION: {
    assists: ["assists"],
    xgAssist: ["xgAssist"],
    shotAssists: ["shotAssists"],
    groupKeyPasses: ["groupKeyPasses"],
  },
  DUELS: {
    groupDefensiveDuels: ["groupDefensiveDuels"],
    groupDribblesAgainst: ["groupDribblesAgainst"],
    groupOffensiveDuels: ["groupOffensiveDuels"],
    groupDribbles: ["groupDribbles"],
    groupAerialDuels: ["groupAerialDuels"],
    groupSlidingTackles: ["groupSlidingTackeles"],
    groupLooseBallDuels: ["groupLooseBallDuels"],
    fouls: ["fouls"],
  },
  POSSESSION: {
    interceptions: ["interceptions"],
    groupRecoveries: ["groupRecoveries.recoveries"],
    groupRecoveriesOpponentHalfRecoveries: [
      "groupRecoveries.opponentHalfRecoveries",
    ],
    groupRecoveriesDangerousOpponentHalfRecoveries: [
      "groupRecoveries.dangerousOpponentHalfRecoveries",
    ],
    groupLosses: ["groupLosses.losses"],
    groupOwnHalfLosses: ["groupLosses.ownHalfLosses"],
    groupDangerousOwnHalfLosses: ["groupLosses.dangerousOwnHalfLosses"],
    pressingDuels: ["pressingDuels"],
    counterpressingRecoveries: ["counterpressingRecoveries"],
  },
  PERCUSSION: {
    groupDribbles2: ["groupDribbles2"],
    progressiveRun: ["progressiveRun"],
    accelerations: ["accelerations"],
  },
  SET_PIECES: {
    directFreeKicksOnTarget: ["directFreeKicksOnTarget"],
    freeKicksOnTarget: ["freeKicksOnTarget"],
    corners: ["corners"],
  },
  GOALKEEPER: {
    gkAerialDuels: ["gkAerialDuels"],

    groupGoalKicksGoalKicksShort: ["groupGoalKicks.goalKicksShort"],
    groupGoalKicksGoalKicksLong: ["groupGoalKicks.goalKicksLong"],
    gkSaves: ["gkSaves"],
    gkGoals: ["gkGoals"],
  },
};

export const TRANSLATION: any = {
  FINITION: "FINITION",
  goals: "BUTEUR",
  goalsEfficiency: "EFFICACITE DEVANT LE BUT",
  shots: "NOMBRE D'OCCASIONS",
  shotsOnTarget: "QUALITE DES TIRS",
  headShotsOnTarget: "QUALITE DU JEU AERIEN",
  DISTRIBUTION: "DISTRIBUTION",
  groupPasses: "PARTICIPATION AU JEU",
  groupCrosses: "CENTRES",
  groupSmartPasses: "PASSES CREATIVES & TECHNIQUES",
  groupThroughPasses: "PASSES EN PROFONDEURS",
  groupLongPasses: "PASSES LONGUES",
  groupForwardPasses: "RATIO DE PASSES VERS L'AVANT",
  CREATION: "CREATION",
  assists: "PASSES DECISIVE",
  xgAssist: "PREDICTION DES PASSES DECISIVES",
  shotAssists: "PASSES AVANT UN TIR",
  groupKeyPasses: "PASSES CLEFS",
  DUELS: "DUELS",
  fouls: "FAUTES COMMISES",
  groupAerialDuels: "DUELS AERIENS",
  groupDefensiveDuels: "DUELS DEFENSIFS",
  groupDribbles: "DRIBBLES",
  groupDribblesAgainst: "DRIBBLES ADVERSES",
  groupLooseBallDuels: "CONQUETE DU BALLON",
  groupOffensiveDuels: "DUELS OFFENSIFS",
  groupSlidingTackles: "TACLES GLISSES",
  POSSESSION: "POSSESSION",
  interceptions: "INTERCEPTIONS",
  pressingDuels: "PRESSING",
  counterpressingRecoveries: "CONTRE PRESSING",
  groupRecoveries: "RECUPERATIONS",
  groupRecoveriesOpponentHalfRecoveries: "RECUPERATIONS DANS LA MOITIE ADVERSE",
  groupRecoveriesDangerousOpponentHalfRecoveries:
    "RECUPERATIONS DANGEREUSE DANS LA MOITIE ADVERSE",
  groupLosses: "PERTES DU BALLON",
  groupOwnHalfLosses: "PERTE DANS SA MOITIE DE TERRAIN",
  groupDangerousOwnHalfLosses: "PERTES DANGEREUSE DANS SA MOITIE DE TERRAIN",
  PERCUSSION: "PERCUSSION",
  groupDribbles2: "DRIBBLES",
  accelerations: "ACCELERATIONS",
  progressiveRun: "COURSES PROGRESSIVES",
  SET_PIECES: "SET PIECES",
  directFreeKicksOnTarget: "COUPS FRANCS DIRECTS",
  freeKicksOnTarget: "COUPS FRANCS INDIRECTS",
  corners: "CORNERS",
};

export const PONDERATION = {
  GOALKEEPER: {
    FINITION: 0,
    CREATION: 0,
    DISTRIBUTION: 0,
    PERCUSSION: 0,
    POSSESSION: 0,
    DUELS: 0,
    SET_PIECES: 0,
    GOALKEEPER: 1,
  },
  ATTAQUANTS: {
    FINITION: 4,
    CREATION: 1,
    DISTRIBUTION: 0,
    PERCUSSION: 0,
    POSSESSION: 0,
    DUELS: 0,
    SET_PIECES: 0,
    GOALKEEPER: 0,
  },
  ATTAQUANTSLEFT: {
    FINITION: 4,
    CREATION: 1,
    DISTRIBUTION: 0,
    PERCUSSION: 0,
    POSSESSION: 0,
    DUELS: 0,
    SET_PIECES: 0,
    GOALKEEPER: 0,
  },
  ATTAQUANTSRIGHT: {
    FINITION: 4,
    CREATION: 1,
    DISTRIBUTION: 0,
    PERCUSSION: 0,
    POSSESSION: 0,
    DUELS: 0,
    SET_PIECES: 0,
    GOALKEEPER: 0,
  },
  AILLIERSLEFT: {
    FINITION: 3,
    CREATION: 3,
    DISTRIBUTION: 2,
    PERCUSSION: 2,
    POSSESSION: 2,
    DUELS: 1,
    SET_PIECES: 0,
    GOALKEEPER: 0,
  },
  AILLIERSRIGHT: {
    FINITION: 3,
    CREATION: 3,
    DISTRIBUTION: 2,
    PERCUSSION: 2,
    POSSESSION: 2,
    DUELS: 1,
    SET_PIECES: 0,
    GOALKEEPER: 0,
  },
  MILIEUXOFFENSIF: {
    FINITION: 3,
    CREATION: 3,
    DISTRIBUTION: 3,
    PERCUSSION: 2,
    POSSESSION: 2,
    DUELS: 1,
    SET_PIECES: 0,
    GOALKEEPER: 0,
  },
  MILIEUXRELAYEUR: {
    FINITION: 3,
    CREATION: 3,
    DISTRIBUTION: 3,
    PERCUSSION: 2,
    POSSESSION: 3,
    DUELS: 2,
    SET_PIECES: 0,
    GOALKEEPER: 0,
  },
  MILIEUXDEFENSIF: {
    FINITION: 2,
    CREATION: 2,
    DISTRIBUTION: 3,
    PERCUSSION: 1,
    POSSESSION: 3,
    DUELS: 3,
    SET_PIECES: 0,
    GOALKEEPER: 0,
  },
  DEFENSEURSCENTRAUX: {
    FINITION: 2,
    CREATION: 2,
    DISTRIBUTION: 4,
    PERCUSSION: 0,
    POSSESSION: 4,
    DUELS: 4,
    SET_PIECES: 0,
    GOALKEEPER: 0,
  },
  DEFENSEURSLATERAUXLEFT: {
    FINITION: 3,
    CREATION: 3,
    DISTRIBUTION: 2,
    PERCUSSION: 3,
    POSSESSION: 2,
    DUELS: 2,
    SET_PIECES: 0,
    GOALKEEPER: 0,
  },
  DEFENSEURSLATERAUXRIGHT: {
    FINITION: 3,
    CREATION: 3,
    DISTRIBUTION: 2,
    PERCUSSION: 3,
    POSSESSION: 2,
    DUELS: 2,
    SET_PIECES: 0,
    GOALKEEPER: 0,
  },
};

export const POSITIONS = {
  GOALKEEPER: ["gk"],
  DEFENSEURSLATERAUXLEFT: ["lb", "lb5", "lwb"],
  DEFENSEURSLATERAUXRIGHT: ["rb", "rb5", "rwb"],
  DEFENSEURSCENTRAUX: ["cb", "lcb", "lcb3", "rcb", "rcb3"],
  MILIEUXDEFENSIF: ["dmf", "rdmf", "ldmf"],
  MILIEUXRELAYEUR: ["lcmf", "lcmf3", "rcmf", "rcmf3"],
  MILIEUXOFFENSIF: ["amf", "ramf", "lamf"],
  AILLIERSRIGHT: ["rw"],
  AILLIERSLEFT: ["lw"],
  ATTAQUANTS: ["cf", "ss"],
  ATTAQUANTSLEFT: ["lwf"],
  ATTAQUANTSRIGHT: ["rwf"],
};

export const POSITIONS_KEYS = Object.entries(POSITIONS);

export const getGroupPosition = (position: any) => {
  if (!position) return;
  const groupPositions: any = find(POSITIONS_KEYS, ([groupKey, positions]) =>
    positions.includes(position)
  );
  return groupPositions[0];
};
