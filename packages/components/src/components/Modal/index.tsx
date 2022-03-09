/* stylelint-disable indentation */
import * as React from 'react';
import styled, { css } from 'styled-components';
import { useKeyPress, useTheme } from '../../utils/hooks';
import { Icon } from '../Icon';
import { H1 } from '../typography/Heading';
import { variables } from '../../config';
import { ProgressBar } from './components/ProgressBar';
import { Backdrop } from './components/Backdrop';

const Header = styled.div`
    margin-bottom: 25px;
`;

const HeaderBar = styled.div<{ showBottomBorder: boolean }>`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    word-break: break-word;
    padding: 24px;

    ${H1} {
        font-weight: ${variables.FONT_WEIGHT.MEDIUM};
    }

    border-bottom: ${({ showBottomBorder, theme }) =>
        showBottomBorder ? `1px solid ${theme.STROKE_GREY}` : 'none'};
`;

const CancelIconWrapper = styled.div`
    display: inline-block;
    position: relative;
    top: auto;
    right: auto;
    align-items: center;
    padding-left: 30px;
    margin-left: auto;
`;

const CancelIcon = styled(Icon)`
    cursor: pointer;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 35px 40px;

    @media (max-width: ${variables.SCREEN_SIZE.SM}) {
        padding: 16px;
    }
`;

const Description = styled.div`
    color: ${({ theme }) => theme.TYPE_LIGHT_GREY};
    font-size: ${variables.FONT_SIZE.SMALL};
    margin-bottom: 10px;
    text-align: center;
`;

const Content = styled.div`
    display: flex;
    color: ${({ theme }) => theme.TYPE_DARK_GREY};
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const BottomBar = styled.div`
    display: flex;
    justify-content: center;
    padding: 0 32px 32px;
    > * + * {
        margin-left: 16px;
    }
`;

const ModalWindow = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 16px;
    text-align: center;
    overflow: hidden; /* retains border-radius when using background in child component */
    transition: all 0.3s;
    max-height: 90vh;
    max-width: 95vw;
    width: 720px;

    ${({ theme }) =>
        css`
            background: ${theme.BG_WHITE};
            box-shadow: 0 10px 80px 0 ${theme.BOX_SHADOW_MODAL};
        `}
`;

const GuideBackdrop = styled(Backdrop)<{ guideOpen: boolean }>`
    > * {
        margin-right: ${({ guideOpen }) =>
            guideOpen ? variables.LAYOUT_SIZE.GUIDE_PANEL_WIDTH : '0'};
        transition: all 0.3s;
    }
`;

interface ModalProps {
    children?: React.ReactNode;
    heading?: React.ReactNode;
    header?: React.ReactNode;
    description?: React.ReactNode;
    bottomBar?: React.ReactNode;
    cancelable?: boolean;
    onCancel?: () => void;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    totalProgressBarSteps?: number;
    currentProgressBarStep?: number;
    guideOpen?: boolean;
    className?: string;
    'data-test'?: string;
}

type ModalSubcomponents = {
    HeaderBar: typeof HeaderBar;
    Body: typeof Body;
    Description: typeof Description;
    Content: typeof Content;
    BottomBar: typeof BottomBar;
};

const Modal: React.FC<ModalProps> & ModalSubcomponents = ({
    children,
    heading,
    header,
    description,
    bottomBar,
    cancelable = false,
    onClick,
    onCancel,
    totalProgressBarSteps,
    currentProgressBarStep,
    guideOpen = false,
    className,
    'data-test': dataTest,
}) => {
    const escPressed = useKeyPress('Escape');
    const theme = useTheme();

    // check if progress bar placeholder should be rendered
    const showProgressBar =
        totalProgressBarSteps !== undefined && currentProgressBarStep !== undefined;

    if (cancelable && escPressed) {
        onCancel?.();
    }

    return (
        <GuideBackdrop
            guideOpen={guideOpen}
            onClick={() => {
                if (cancelable) {
                    onCancel?.();
                }
            }}
        >
            {header && <Header>{header}</Header>}
            <ModalWindow
                data-test={dataTest}
                className={className}
                onClick={e => {
                    onClick?.(e);
                    e.stopPropagation();
                }}
            >
                {heading && (
                    <HeaderBar showBottomBorder={!showProgressBar}>
                        <H1 noMargin>{heading}</H1>
                        {cancelable && (
                            <CancelIconWrapper>
                                <CancelIcon
                                    size={24}
                                    color={theme.TYPE_DARK_GREY}
                                    icon="CROSS"
                                    data-test="@modal/close-button"
                                    onClick={onCancel}
                                />
                            </CancelIconWrapper>
                        )}
                    </HeaderBar>
                )}

                {showProgressBar && (
                    <ProgressBar current={currentProgressBarStep} total={totalProgressBarSteps} />
                )}

                <Body>
                    {description && <Description>{description}</Description>}
                    <Content>{children}</Content>
                </Body>

                {bottomBar && <BottomBar>{bottomBar}</BottomBar>}
            </ModalWindow>
        </GuideBackdrop>
    );
};

Modal.HeaderBar = HeaderBar;
Modal.Body = Body;
Modal.Description = Description;
Modal.Content = Content;
Modal.BottomBar = BottomBar;

export { Modal };
export type { ModalProps };
