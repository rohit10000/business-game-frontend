import { useState, useCallback } from 'react';

export const useModal = (initialState = false) => {
  const [isVisible, setIsVisible] = useState(initialState);
  const [modalData, setModalData] = useState(null);

  const openModal = useCallback((data = null) => {
    setModalData(data);
    setIsVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsVisible(false);
    setModalData(null);
  }, []);

  const toggleModal = useCallback(() => {
    setIsVisible(prev => !prev);
  }, []);

  return {
    isVisible,
    modalData,
    openModal,
    closeModal,
    toggleModal
  };
};

export const useModalStack = () => {
  const [modalStack, setModalStack] = useState([]);

  const pushModal = useCallback((modalConfig) => {
    setModalStack(prev => [...prev, { ...modalConfig, id: Date.now() }]);
  }, []);

  const popModal = useCallback(() => {
    setModalStack(prev => prev.slice(0, -1));
  }, []);

  const clearModals = useCallback(() => {
    setModalStack([]);
  }, []);

  const updateCurrentModal = useCallback((updates) => {
    setModalStack(prev => {
      if (prev.length === 0) return prev;
      const newStack = [...prev];
      newStack[newStack.length - 1] = { ...newStack[newStack.length - 1], ...updates };
      return newStack;
    });
  }, []);

  const currentModal = modalStack[modalStack.length - 1] || null;
  const hasModals = modalStack.length > 0;

  return {
    modalStack,
    currentModal,
    hasModals,
    pushModal,
    popModal,
    clearModals,
    updateCurrentModal
  };
};

export const useFormModal = (validationSchema = {}) => {
  const { isVisible, openModal, closeModal } = useModal();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  }, [errors]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    
    Object.keys(validationSchema).forEach(field => {
      const validator = validationSchema[field];
      const value = formData[field];
      
      if (typeof validator === 'function') {
        const error = validator(value);
        if (error) newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validationSchema]);

  const handleSubmit = useCallback(async (onSubmit) => {
    if (!validateForm()) return false;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      closeModal();
      setFormData({});
      setErrors({});
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: error.message });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, closeModal]);

  const openFormModal = useCallback((initialData = {}) => {
    setFormData(initialData);
    setErrors({});
    openModal();
  }, [openModal]);

  const closeFormModal = useCallback(() => {
    setFormData({});
    setErrors({});
    closeModal();
  }, [closeModal]);

  return {
    isVisible,
    formData,
    errors,
    isSubmitting,
    updateField,
    handleSubmit,
    openModal: openFormModal,
    closeModal: closeFormModal
  };
};