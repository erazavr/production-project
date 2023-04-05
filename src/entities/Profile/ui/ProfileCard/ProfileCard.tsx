import { CountrySelect } from 'entities/Country'
import { type Country } from 'entities/Country/model/types/country'
import { CurrencySelect } from 'entities/Currency'
import { type Currency } from 'entities/Currency/model/types/currency'
import { type Profile } from '../../model/types/profile'
import { useTranslation } from 'react-i18next'
import { classNames, type Mods } from 'shared/lib/classNames/classNames'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Input } from 'shared/ui/Input/Input'
import { Loader } from 'shared/ui/Loader/Loader'
import { Text, TextAlign, TextVariant } from 'shared/ui/Text/Text'

import cls from './ProfileCard.module.scss'

interface ProfileCardProps {
  className?: string
  data?: Profile
  isLoading?: boolean
  error?: string
  readonly?: boolean
  onChangeFirstname?: (value: string) => void
  onChangeLastname?: (value: string) => void
  onChangeAge?: (value: string) => void
  onChangeCity?: (value: string) => void
  onChangeUsername?: (value: string) => void
  onChangeAvatar?: (value: string) => void
  onChangeCurrency?: (value: Currency) => void
  onChangeCountry?: (value: Country) => void
}

export const ProfileCard = (props: ProfileCardProps) => {
  const {
    className,
    data,
    error,
    isLoading,
    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    readonly,
    onChangeUsername,
    onChangeAvatar,
    onChangeCurrency,
    onChangeCountry
  } = props
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
        <Loader/>
      </div>
    )
  }

  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          align={TextAlign.CENTER}
          variant={TextVariant.ERROR}
          title={t('Произошла ошибка при загрузке профиля')}
          text={t('Попробуйте обновить страницу')}
        />
      </div>
    )
  }

  const mods: Mods = {
    [cls.editing]: !readonly
  }

  return (
    <div className={classNames(cls.ProfileCard, mods, [className])}>
      <div className={cls.data}>
        {data?.avatar && (
          <div className={cls.avatarWrapper}>
            <Avatar src={data.avatar} />
          </div>
        )}
        <Input
          value={data?.first}
          placeholder={t('Ваше имя')}
          className={cls.input}
          onChange={onChangeFirstname}
          readonly={readonly}
        />
        <Input
          value={data?.lastname}
          placeholder={t('Ваша фамилия')}
          className={cls.input}
          onChange={onChangeLastname}
          readonly={readonly}
        />
        <Input
          value={data?.age}
          placeholder={t('Ваша возраст')}
          className={cls.input}
          onChange={onChangeAge}
          readonly={readonly}
        />
        <Input
          value={data?.city}
          placeholder={t('Ваша город')}
          className={cls.input}
          onChange={onChangeCity}
          readonly={readonly}
        />
        <Input
          value={data?.username}
          placeholder={t('Введите имя пользователя')}
          className={cls.input}
          onChange={onChangeUsername}
          readonly={readonly}
        />
        <Input
          value={data?.avatar}
          placeholder={t('Введите ссылку на аватар')}
          className={cls.input}
          onChange={onChangeAvatar}
          readonly={readonly}
        />
        <CurrencySelect
          className={cls.input}
          value={data?.currency}
          onChange={onChangeCurrency}
          readonly={readonly}
        />
        <CountrySelect
          className={cls.input}
          value={data?.country}
          onChange={onChangeCountry}
          readonly={readonly}
        />
      </div>
    </div>
  )
}
