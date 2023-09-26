<?php

namespace App\Service;

use App\Repository\CompagnieRepository;
use App\Repository\DisciplineRepository;
use App\Repository\ParticipantRepository;
use App\Repository\UserRepository;
use http\Exception\InvalidArgumentException;
use Symfony\Component\String\Slugger\AsciiSlugger;

class AllRepositories
{
    public function __construct(
        private UserRepository $userRepository,
        private DisciplineRepository $disciplineRepository,
        private CompagnieRepository $compagnieRepository,
        private ParticipantRepository $participantRepository
    )
    {
    }

    public function generateLicence(): string
    {
        do{
            $lettre_aleatoire = chr(random_int(0,25) + ord('A'));
            $nombre_aleatoire = random_int(10000,99999);

            $licence = date('y').'-'.$nombre_aleatoire.' '.$lettre_aleatoire;

            $verifLicence = $this->participantRepository->findOneBy(['licence' => $licence]);

        } while($verifLicence);

        return $licence;

    }

    public function getUsers(string $email ): array
    {
        if (empty($email)){
            throw new InvalidArgumentException("Le nom utilisateur ne peut être vide");
        }

        try {
            $getUsers = $this->userRepository->findWithout($email);
        } catch (\Exception $e){
            error_log("Erreur lors de la récupération des utilisateurs : " .$e->getMessage());
            return [];
        }

        return array_map(static function ($getUser) {
            $roleMapping = [
                'ROLE_ADMIN' => "Administrateur",
                'ROLE_COORDINATEUR' => "Coordinateur",
                'ROLE_USER' => "Utilisateur"
            ];
            $roles = $getUser->getRoles()[0] ?? $getUser->getRoles();
            $role = $roleMapping[$roles] ?? 'Utilisateur';

            return [
                'id' => $getUser->getId(),
                'userIdentifier' => $getUser->getUserIdentifier(),
                'role' => $role,
                'connexion' => $getUser->getConnexion(),
                'lastConnectedAt' => $getUser->getLastConnectedAt()
            ];
        }, $getUsers);

    }

    public function slug($entity): void
    {
        $entity->setSlug((new AsciiSlugger())->slug(strtolower($entity->getTitre())));
    }

    public function getAllDiscipline(): array
    {
        return $this->disciplineRepository->findBy([],['titre' => 'ASC']);
    }

    public function getAllCompagnie()
    {
        return $this->compagnieRepository->findBy([],['titre' => "ASC"]);
    }

    public function getUniqueParticipant($slug)
    {
        return $this->participantRepository->findOneBy(['slug' => $slug]);
    }
}