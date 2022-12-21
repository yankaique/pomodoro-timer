import { ButtonContainer, TButtonVariant } from './Button.styles'

interface IButtonProps {
  variant?: TButtonVariant
}

export function Button({ variant = 'primary' }: IButtonProps) {
  return <ButtonContainer variant={variant}>Entre</ButtonContainer>
}
