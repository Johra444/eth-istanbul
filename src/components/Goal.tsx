import { DefaultTheme } from '@ensdomains/thorin'
import styled, { css } from 'styled-components'

export const NavTop = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: ${theme.space['4']};
  `
)

export const MainContent = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: ${theme.space['4']};
  `
)

export const TagRow = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    padding: ${theme.space['2']};
    gap: ${theme.space['2']};
    margin-top: ${theme.space['4']};
  `
)

export const CreatorRow = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: ${theme.space['2']} 0;
    margin-top: ${theme.space['4']};
    gap: ${theme.space['2']};
    align-items: center;
  `
)

export const Divider = styled.div(
  ({ theme }) => css`
    width: calc(100% + 2rem);
    height: 1px;
    background-color: ${theme.colors.grey};
    margin-top: ${theme.space['4']};
    margin-left: -${theme.space['4']};
    margin-right: -${theme.space['4']};
  `
)

export const MemberList = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: ${theme.space['2']} 0;
    gap: ${theme.space['2']};
  `
)

export const MemberRow = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: ${theme.space['4']};
    gap: ${theme.space['2']};
    align-items: center;
  `
)

export const MemberDescription = styled.div(
  ({}) => css`
    display: flex;
    flex-direction: column
  `
)