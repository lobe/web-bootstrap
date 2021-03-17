import React, {FunctionComponent} from "react";
import BlurContainer from "./BlurContainer";
import "./SquareButton.css";

type SquareButtonProps = {
    onClick?: () => void,
    setHover?: (hovering: boolean) => void
};

const SquareButton: FunctionComponent<SquareButtonProps> = ({ onClick, setHover, children }) => {
    // Square button that is inside the blur container
    return (
        <div
            onClick={onClick ? () => onClick() : undefined}
            onMouseEnter={setHover ? () => setHover(true) : undefined}
            onMouseLeave={setHover ? () => setHover(false) : undefined}
        >
            <BlurContainer additionalClassname="square-button">
                { children }
            </BlurContainer>
        </div>

    );
}

export default SquareButton;
