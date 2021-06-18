# Plan de test End-to-End du parcours employé

## Scénario 1

**Given** Je suis un visiteur (non connecté)

**When** Je ne remplis pas le champ e-mail ou le champ password du login employé et je clique sur le bouton Se connecter

**Then** Je reste sur la page Login

**And** Je suis invité à remplir le champ manquant

## Scénario 2

**Given** Je suis un visiteur (non connecté)

**When** Je remplis le champ e-mail du login employé au mauvais format (sans la forme string@string.string) et je clique sur le bouton Se connecter

**Then** Je reste sur la page Login

**And** Je suis invité à remplir le champ e-mail au bon format

## Scénario 3

**Given** Je suis un visiteur (non connecté)

**When** je remplis le champ e-mail du login employé au bon format (sous la forme string@string.string), le champ password du login employé et je clique sur le bouton Se connecter

**Then** Je suis redirigé vers la page Dashboard

## Scénario 4

**Given** Je suis connecté en tant qu'employé

**When** Je suis sur le dashboard

**Then** Je vois la liste de toutes les notes de frais que j'ai envoyées

## Scénario 5

**Given** Je suis connecté en tant qu’employé sur la page Dashboard

**When** je clique sur le bouton Nouvelle note de frais

**Then** Le formulaire de création d’une nouvelle note de frais est affiché avec l’ensemble des champs vides

## Scénario 6

**Given** Je suis connecté en tant qu’employé

**When** Je ne remplis pas le champ date du formulaire de création d’une nouvelle note de frais et je clique sur le bouton Envoyer

**Then** Je reste sur le formulaire de création d’une nouvelle note de frais

**And** Je suis invité à remplir le champ date

## Scénario 7

**Given** Je suis connecté en tant qu’employé

**When** Je remplis le champ Date mais pas le champ Montant TTC du formulaire de création d’une nouvelle note de frais et je clique sur le bouton Envoyer

**Then** Je reste sur le formulaire de création d’une nouvelle note de frais

**And** Je suis invité à remplir le champ Montant TTC

## Scénario 8

**Given** Je suis connecté en tant qu’employé

**When** Je remplis le champ Date et le champ Montant TTC mais pas le champ TVA du formulaire de création d’une nouvelle note de frais et je clique sur le bouton Envoyer

**Then** Je reste sur le formulaire de création d’une nouvelle note de frais

**And** Je suis invité à remplir le champ TVA

## Scénario 9

**Given** Je suis connecté en tant qu’employé

**When** Je remplis le champ Date, le champ Montant TTC et le champ TVA mais je n’ajoute pas de justificatif dans le formulaire de création d’une nouvelle note de frais et je clique sur le bouton Envoyer

**Then** Je reste sur le formulaire de création d’une nouvelle note de frais

**And** Je suis invité à ajouter un justificatif

## Scénario 10

**Given** Je suis connecté en tant qu’employé

**When** Je remplis le champ Date, le champ Montant TTC, le champ TVA et j’ajoute un justificatif dans le formulaire de création d’une nouvelle note de frais et je clique sur le bouton Envoyer

**Then** Je suis redirigé vers la page Dashboard

**And** Je vois la note de frais que je viens de créer avec le statut “En attente”

## Scénario 11

**Given** Je suis connecté en tant qu'employé et je suis sur la page Dashboard

**When** Je clique sur le bouton pour visualiser une note de frais

**Then** Une modale apparaît avec le PDF du justificatif

## Scénario 12

**Given** Je suis connecté en tant qu'employé et je suis sur la page Dashboard

**When** Je clique sur le bouton Se déconnecter de la barre verticale

**Then** Je suis envoyé à la page Login

## Scénario 13

**Given** Je suis connecté en tant qu'employé et je suis sur la page Dashboard

**When** Je clique sur le bouton Retour en arrière de la navigation

**Then** Je reste sur la page Dashboard