/**
 * Représente une une réponse à une demande d'authentification
 */
export interface HttpAuthResponse {
    /**
     * L'identifiant de l'utilisateur
     */
    userId: string;
    /**
     * Le token de l'utilisateur
     */
    token: string;
  }