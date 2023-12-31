import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import $ from 'jquery';

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselItems = [
        // {
        //     title: "Les Mining Olympiades 2023",
        //     subtitle: "sous le thème: <span>Valorisons nos régions</span>",
        //     date: "auront lieu les 15 et 16 décembre 2023 à Yamoussoukro",
        //     link: "/participation"
        // },
        {
            title: "Mining Olympiades 2023",
            subtitle: "C'est une compétition sportive",
            theme: "Pour les miniers",
            link: "/participation"
        },
        {
            title: "Mining Olympiades 2023",
            subtitle: "C'est une journée scientifique",
            date: "Pour les étudiants",
            link: "/participation"
        },
        {
            title: "Mining Olympiades 2023",
            subtitle: "C'est un dîner gala",
            artists: "De récompenses",
            link: "/participation"
        }
    ];

    useEffect(() => {
        // Utilisez la variable carouselItems déjà déclarée en dehors de cette fonction
        const carouselItemsElements = document.querySelectorAll(".carousel-elt");
        let interval;

        function showItem(index) {
            carouselItemsElements.forEach((item) => {
                item.style.opacity = "0";
            });
            carouselItemsElements[index].style.opacity = "1";
        }

        function cycleItems() {
            carouselItemsElements[currentIndex].style.opacity = "0";
            setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItemsElements.length);
            carouselItemsElements[currentIndex].style.opacity = "1";
        }

        showItem(currentIndex);
        interval = setInterval(cycleItems, 4000);

        const carousel = document.querySelector(".carousel");
        carousel.addEventListener("mouseenter", () => {
            clearInterval(interval);
        });

        carousel.addEventListener("mouseleave", () => {
            interval = setInterval(cycleItems, 4000);
        });

        const slide = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItemsElements.length);
        }, 5000);

        return () => {
            clearInterval(slide);
        };

    }, [currentIndex]);


    return (
        <div>
            <section id="carousel">
                <div className="container carousel-container">
                    <div className="carousel" data-aos="zoom-in">
                        {carouselItems.map((item, index) => (
                            <div
                                key={index}
                                className={`carousel-elt ${index === currentIndex ? 'active' : ''}`}
                            >
                                <h1 dangerouslySetInnerHTML={{ __html: item.title}}/>
                                {item.subtitle && <h2 dangerouslySetInnerHTML={{ __html: item.subtitle}}/>}
                                {item.theme && <h3> <span className="theme">{item.theme}</span></h3>}
                                {item.date && <h3>{item.date}</h3>}
                                {item.artists && <h3>{item.artists}</h3>}
                                {/*<a className="bouton" onClick={handleClick}>Participer</a>*/}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
