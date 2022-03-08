import React, { useState } from 'react';
import DeviceSelector from './components/DeviceSelector';
import MainNavigation from './components/MainNavigation';
import NavigationActions from './components/NavigationActions';
import styled from 'styled-components';
import { Icon, useTheme, variables } from '@trezor/components';
import { useLayoutSize } from '@suite-hooks';
import { useGuide, GUIDE_ANIMATION_DURATION_MS } from '@guide-hooks/useGuide';

const StyledDeviceSelector = styled(DeviceSelector)``;

const Wrapper = styled.div<{ guideOpen: boolean; isModalOpen: boolean }>`
    display: flex;
    width: 100%;
    min-height: 80px;
    flex: 0;
    z-index: ${variables.Z_INDEX.NAVIGATION_BAR};
    padding: 6px 8px;
    align-items: center;
    background: ${props => props.theme.BG_WHITE};
    border-bottom: 1px solid ${props => props.theme.STROKE_GREY};
    transition: ${({ isModalOpen }) =>
        !isModalOpen && `filter ${GUIDE_ANIMATION_DURATION_MS}ms ease-in`};
    filter: ${({ guideOpen, isModalOpen }) => (guideOpen || isModalOpen) && 'blur(3px)'};

    &${StyledDeviceSelector}:hover {
        /* apply same device selector's hover styles on hover anywhere in navigation panel */
        border-radius: 4px;
        box-shadow: 0 1px 2px 0 ${props => props.theme.BOX_SHADOW_BLACK_20};
    }

    ${variables.SCREEN_QUERY.ABOVE_LAPTOP} {
        padding: 6px 32px 6px 8px;
        filter: ${({ guideOpen, isModalOpen }) => guideOpen && !isModalOpen && 'none'};
    }
`;

const HamburgerWrapper = styled.div`
    display: flex;
    padding-right: 12px;
    flex: 1;
    justify-content: flex-end;
`;

const MobileNavigationWrapper = styled.div`
    position: relative;
    height: 100vh;
    z-index: ${variables.Z_INDEX.NAVIGATION_BAR};
`;

const ExpandedMobileNavigation = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    background: ${props => props.theme.BG_WHITE};
    z-index: 3;
    width: 100%;
    height: 100%;
`;

const NavigationBar = () => {
    const [opened, setOpened] = useState(false);

    const { isMobileLayout } = useLayoutSize();
    const theme = useTheme();
    const { guideOpen, isModalOpen } = useGuide();

    const closeMainNavigation = () => {
        setOpened(false);
    };

    if (isMobileLayout) {
        return (
            <>
                <Wrapper guideOpen={guideOpen} isModalOpen={isModalOpen}>
                    <StyledDeviceSelector />
                    <HamburgerWrapper>
                        <Icon
                            onClick={() => setOpened(!opened)}
                            icon={opened ? 'CROSS' : 'MENU'}
                            size={24}
                            color={theme.TYPE_DARK_GREY}
                        />
                    </HamburgerWrapper>
                </Wrapper>
                {opened && (
                    <MobileNavigationWrapper>
                        <ExpandedMobileNavigation>
                            <MainNavigation
                                isMobileLayout={isMobileLayout}
                                closeMainNavigation={closeMainNavigation}
                            />
                            <NavigationActions
                                isMobileLayout={isMobileLayout}
                                closeMainNavigation={closeMainNavigation}
                            />
                        </ExpandedMobileNavigation>
                    </MobileNavigationWrapper>
                )}
            </>
        );
    }

    return (
        <Wrapper guideOpen={guideOpen} isModalOpen={isModalOpen}>
            <StyledDeviceSelector />
            <MainNavigation />
            <NavigationActions />
        </Wrapper>
    );
};

export default NavigationBar;
