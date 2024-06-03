import { styled, keyframes } from 'styled-components';

const SkyObj = styled.span`
    font-size: 4em;
    position: relative;
    left: ${(props) => props.left}%;
    bottom: ${(props) => props.bottom}%;
    rotate: -10deg;
    animation: ${keyframes`
        50% {transform: translateY(${20*Math.random()}px) rotate(20deg);}
    `} ${(props) => props.duration}s infinite;
`

function SkyObjects() {

    const emojis_bottom = [...'⛅🌫️☁️🛫🌧️⚡'];
    const percentages = [-47,0, 0]

    return (
        emojis_bottom.map((emoji, id) =>
            <SkyObj key={id}
            left={percentages[id%2] + Math.random() * 30}
            bottom={30 + 0.5 * id * (Math.random())}
            duration={3 + 5 * Math.random()}>
                {emoji}
            </SkyObj>
        )

    )
}

export default SkyObjects;
