import { useState } from "react";

const useDisclosure = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAdd, setIsOpenAdd] = useState(false);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    const onOpenAdd = () => setIsOpenAdd(true);
    const onCloseAdd = () => setIsOpenAdd(false)

    return { isOpen, isOpenAdd, onOpen, onClose, onOpenAdd, onCloseAdd };
};

export default useDisclosure;
