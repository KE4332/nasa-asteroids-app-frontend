import { styled, keyframes } from 'styled-components';

const SpaceObj = styled.span`
    font-size: 2.5em;
    position: absolute;
    left: ${(props) => props.left}%;
    top: ${(props) => props.top}%;
    rotate: -10deg;
    animation: ${keyframes`
        50% {transform: translateY(${20*Math.random()}px) rotate(20deg);}
    `} ${(props) => props.duration}s infinite;
`

function SpaceObjects() {

    const emojis_top = [...'🌌🪐🌠🛸🪐🌕👾🌜🌟🚀'];
    const percentages = [0, 90]

    return (
        <div>
            <div>
            {emojis_top.map((emoji, id) =>
                <SpaceObj key={id}
                left={Math.random() * 6 + percentages[id%2]}
                top={25 + id * (6 + 3 * Math.random())}
                duration={3 + 5 * Math.random()}>
                    {emoji}
                </SpaceObj>
            )}
            </div>
            <div>
            </div>
        </div>

    )
}

export default SpaceObjects;
