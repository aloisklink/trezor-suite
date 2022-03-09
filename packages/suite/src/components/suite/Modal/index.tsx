import React, { ComponentType } from 'react';
import { Modal as TrezorModal, ModalProps as TrezorModalProps } from '@trezor/components';
import { useGuide } from '@guide-hooks';

export type ModalProps = TrezorModalProps & {
    render?: ComponentType<TrezorModalProps>;
};

const DefaultRenderer = (props: TrezorModalProps) => {
    const { guideOpen, isModalOpen } = useGuide();
    return <TrezorModal guideOpen={guideOpen && isModalOpen} {...props} />;
};

export const Modal = ({ render: View = DefaultRenderer, ...props }: ModalProps) => (
    <View {...props} />
);

Modal.HeaderBar = TrezorModal.HeaderBar;
Modal.Body = TrezorModal.Body;
Modal.Description = TrezorModal.Description;
Modal.Content = TrezorModal.Content;
Modal.BottomBar = TrezorModal.BottomBar;
