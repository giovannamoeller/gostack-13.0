import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from "react";
import { IconBaseProps } from 'react-icons';
import { Container } from "./styles";
import { useField } from '@unform/core';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({name, icon: Icon, ...rest}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value)
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName, // nome do campo -> fieldName
      ref: inputRef.current, // retorna a referência para manipular-mos o objeto
      path: 'value' // da onde o unform busca o valor do input (document.querySelector('input').value)
    });
  }, [fieldName, registerField]);
  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
        {Icon && <Icon size={20}/>}
        <input ref={inputRef} {...rest} onFocus={handleInputFocus} onBlur={handleInputBlur}/>
        {error}
    </Container>
  )
};
export default Input;