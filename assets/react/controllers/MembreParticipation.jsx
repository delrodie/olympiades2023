import React, {useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AOS from 'aos';
import ReactLoading from 'react-loading';

export default function () {
    const [isLoading, setIsLoading] = useState(false);
    const [disciplines, setDisciplines] = useState([]);
    const [selectedDiscipline, setSelectedDiscipline] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');

    useEffect(() => {
        AOS.init();

        async function fetchDiscipline(){
            try {
                const response = await fetch('/api/discipline/participation');
                if (!response.ok){
                    throw new Error("La réquête a échoué");
                }

                const disciplineData = await response.json();
                setDisciplines(disciplineData);
                console.log(disciplineData)
            } catch (e) {
                console.error("Erreur de la récupération des discipline: ", e)
            }
        }
        fetchDiscipline();
    }, []);


    const handleNomChange = (e) => {
        setNom(e.target.value.toUpperCase());
    }

    const handlePrenomChange = (e) => {
        setPrenom(e.target.value.toUpperCase());
    }

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            const formData = new FormData(e.target);
            const response = await fetch('/api/discipline/participation/membre', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error("La requête a échoué");
            }

            const responseData = await response.json();
            // Traiter la réponse du serveur, afficher un message, etc.
            console.log(responseData);

            Swal.fire('Succès', 'Enregistrement réussi', 'success');

            window.location.href = '/membre/participation'
        } catch (error) {
            console.error("Erreur lors de la soumission du formulaire :", error);
            Swal.fire('Erreur', 'Une erreur s\'est produite', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <section id="inscription">
                <div className="inscription">
                    <div className="row no-gutters justify-content-center align-items-center">
                        <div className="col-xl-10">
                            <div className="formulaire-bloc"  data-aos="fade-up" data-aos-duration="1500">
                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-5 justify-content-center align-content-center">
                                        <div className="col-12 mb-1 text-center">
                                            <h3 className="titre">Formulaire</h3>
                                        </div>
                                    </div>
                                    <div className="row row-cols-1 row-cols-lg-2 g-4 no-gutters">
                                        <div className="col">
                                            <div className="form-floating">
                                                <select
                                                    className="form-select"
                                                    id="_discipline"
                                                    name="discipline"
                                                    aria-label="Floating label select example"
                                                    value={selectedDiscipline}
                                                    onChange={(e) => setSelectedDiscipline(e.target.value)}
                                                >
                                                    <option>-- Choisissez la discipline de compétition --</option>
                                                    <option value=""></option>
                                                    {disciplines.map((discipline) =>(
                                                        <option
                                                            key={discipline.id}
                                                            value={discipline.id}
                                                        >
                                                            {discipline.titre}
                                                        </option>
                                                    ))}
                                                </select>
                                                <label htmlFor="_discipline">Discipline <span>*</span></label>
                                            </div>
                                        </div>

                                        <div className="col">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="_nom"
                                                    name="nom"
                                                    placeholder="nom"
                                                    autoComplete="off"
                                                    required
                                                    value={nom}
                                                    onChange={handleNomChange}
                                                />
                                                <label htmlFor="floatingInput">Nom <span>*</span> </label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="_prenoms"
                                                    name="prenoms"
                                                    placeholder="prenoms"
                                                    autoComplete="off"
                                                    required
                                                    value={prenom}
                                                    onChange={handlePrenomChange}
                                                />
                                                <label htmlFor="floatingInput">Prenoms <span>*</span></label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="_matricule"
                                                    name="matricule"
                                                    placeholder="matricule"
                                                    autoComplete="off"
                                                    required
                                                />
                                                <label htmlFor="_matricule">Matricule <span>*</span></label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="_contact"
                                                    name="contact"
                                                    placeholder="contact"
                                                    autoComplete="off"
                                                    required
                                                />
                                                <label htmlFor="floatingInput">Contact <span>*</span></label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="_email"
                                                    name="email"
                                                    placeholder="email"
                                                    autoComplete="off"
                                                />
                                                <label htmlFor="floatingInput">Email</label>
                                            </div>
                                        </div>

                                        <div className="col">
                                            <div className="mb-3">
                                                <label htmlFor="">Photo</label>
                                                <input
                                                    className="form-control form-control-lg"
                                                    type="file"
                                                    data-preview=".preview"
                                                    placeholder="Photo"
                                                    required
                                                    id="_media"
                                                    name="media"
                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row mt-5 d-flex justify-content-center align-content-center align-items-center">
                                        <div className="col-12 col-md-6 d-grid gap-2">
                                            <button
                                                type="submit"
                                                className="btn btn-success btn-lg bouton"
                                            >
                                                <i className="bi bi-floppy"></i> Enregistrer
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {isLoading ? (
                <div className="loading-animation">
                    <ReactLoading type="spin" color="#007BFF" />
                </div>
            ) : null}
        </div>
    );
}