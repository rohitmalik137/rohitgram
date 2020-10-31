import { createGlobalStyle } from 'styled-components';
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.bodyBackground};
    color: ${({ theme }) => theme.text} !important;
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;

    a {
      color: ${({ theme }) => theme.text} !important;
      font-weight: lighter;
    }

    .overall {
      background: ${({ theme }) => theme.body} !important;
      color: ${({ theme }) => theme.text} !important;
    }

    .hoverable{
      background: ${({ theme }) => theme.body} !important;
      color: ${({ theme }) => theme.text} !important;

      &:hover{
        background: ${({ theme }) => theme.hover} !important;
      }
    }

    .active{
      background: ${({ theme }) => theme.active} !important;
      color: ${({ theme }) => theme.text} !important;
    }

    .modal-content{
      background: ${({ theme }) => theme.modal};
      color: ${({ theme }) => theme.text} !important;
    }
  }
  `;
