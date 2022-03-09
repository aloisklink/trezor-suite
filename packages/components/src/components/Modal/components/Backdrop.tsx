import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    position: fixed;
    z-index: 10000;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(5px);
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    justify-content: center;
`;

export type BackdropProps = {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
};

export const Backdrop = ({ onClick, children, className }: BackdropProps) => (
    <Wrapper onClick={onClick} className={className} data-test="@modal">
        {children}
    </Wrapper>
);
