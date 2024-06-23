import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import '../index.css';
import { useEffect } from 'react';

function Entities() {
    const entities = [
        { id: 1, name: 'Ear Creature', description: "It has and ear for a head, slender limbs, large hands and feet, and ears covering its rotund body.<br>The most noticeable thing is the whispers emanating from the creature. Once close, it will tackle a player, dealing about a third of the player's health. The only way to counter this monster is by being very loud. Screaming and yelling into your microphone will make it hold its head, and if done long enough, it will retreat for a while.<br>To counter this creature, you must scream as loud as you can and run, since it's vulnerable to loud noise", image: '/entities/Ear_Creature.png' },
        { id: 2, name: 'Ghost Child', description: "Will shamble towards a player once aggro'd, can be outrun while sprinting, but not walking. Once close enough, it will lunge at the player with its knife, dealing around a third of the player's health, while also knocking them down. It can easily stun-lock a player, so be very careful when dealing with one or more. After attacking you, it usually runs away and comes back later.", image: '/entities/Ghost.png' },
        { id: 3, name: 'Little Guy (Mouthe)', description: "Mouthe aimlessly walks around once spawned. He is a generally timid creature and will flee when a player runs towards him. He has no attacks under normal circumstances however is able to hurt you if he is backed into a corner, but screams extremely loud if he manages to sneak up near you. This scream has a chance to deafen players in close proximity, making them unable to effectively communicate with the rest of the crew and oblivious to most threats they cannot see, and thus vulnerable targets for other entities. He seems to like sneaking up on people to scream at them, but this can be recorded if the camera is a ways away while he does.", image: '/entities/Little_Guy.png' },
        { id: 4, name: 'Mixer Man', description: "When it detects players, it will charge up, making a loud whirring sound twice, before charging at them at high speeds with the third sound, doing about 80–90% damage. The name Race Mixer comes from its appearance and speed. If the Whisker is electroshocked or fails to hit the targeted player when charging and hits a wall or the floor, it will lay stunned for approximately two seconds. This creature can be easy to dodge in wide open spaces but can be a threat indoors.", image: '/entities/Mixer_Man.png' },
        { id: 5, name: 'Snail Creatures (Snailbie)', description: "If you get caught by one you can sprint away from its grasp. Just be careful as to where you're running so you don't wind up in danger.", image: '/entities/Snailbie.png' },
        { id: 6, name: 'Spider', description: "The spider is entirely invisible while stationary. When a player enters within a certain radius of the spider, it will attack, shooting webs at the player. The spider itself cannot do damage, but if any part of the player model collided with the web, they will take a small amount of damage over time.", image: '/entities/Spider.png' },
        { id: 7, name: 'Starfish', description: "It hangs off the ceiling and grabs players walking underneath with its claw/hand. Deals minor damage overtime, so the player has some time to escape or rescue stuck teammates. If a captured player does not escape, their corpse will hang indefinitely, and The Starfish is essentially disarmed.", image: '/entities/Starfish.png'}
    ];

    useEffect(() => {
        // pra permitir o scroll suave entre as entidades
        const handleAnchorClick = (event) => {
            if (event.target.tagName === 'A' && event.target.getAttribute('href').startsWith('#')) {
                event.preventDefault();
                const targetId = event.target.getAttribute('href').slice(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const headerOffset = 70;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);
        return () => {
            document.removeEventListener('click', handleAnchorClick);
        };
    }, []);

    return (
        <div>
            {/* Blank space to accommodate the fixed header */}
            <div style={{ height: '70px' }} />
            {/* padding top serve pra barra de cima não ocultar os conteudos */}
            <div style={{ textAlign: 'center', paddingTop: '3000px' }}>
                {/* tabela de conteudos pra poder se guiar pela page */}
                <h1>This is the entity wiki!</h1>
                <div style={{ marginBottom: '40px' }}>
                    <h2>Contents</h2>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {entities.map(entity => (
                            <li key={entity.id} style={{ marginBottom: '10px' }}>
                                <a href={`#${entity.name.replace(/\s+/g, '-')}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                    {entity.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                {entities.map(entity => (
                    <div id={entity.name.replace(/\s+/g, '-')} key={entity.id} className="entity-description">
                        <h2>{entity.name}</h2>
                        <p dangerouslySetInnerHTML={{ __html: entity.description }}></p>
                        <img src={entity.image} alt={`Picture of ${entity.name}`} style={{ width: '150px', height: '150px' }} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Entities;