import { CountrySelect } from 'entities/Country'
import { type Country } from 'entities/Country/model/types/country'
import { CurrencySelect } from 'entities/Currency'
import { type Currency } from 'entities/Currency/model/types/currency'
import { HStack, VStack } from 'shared/ui/Stack'
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
      <HStack justify={'center'} max className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
        <Loader/>
      </HStack>
    )
  }

  if (error) {
    return (
      <HStack justify={'center'} max className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          align={TextAlign.CENTER}
          variant={TextVariant.ERROR}
          title={t('Произошла ошибка при загрузке профиля')}
          text={t('Попробуйте обновить страницу')}
        />
      </HStack>
    )
  }

  const mods: Mods = {
    [cls.editing]: !readonly
  }

  return (
    <VStack gap={'8'} max className={classNames(cls.ProfileCard, mods, [className])}>
      {data?.avatar && (
        <HStack justify={'center'} max>
          <Avatar src={data.avatar} />
        </HStack>
      )}
      <Input
        value={data?.first}
        placeholder={t('Ваше имя')}
        onChange={onChangeFirstname}
        readonly={readonly}
        data-testid="ProfileCard.firstname"
      />
      <Input
        value={data?.lastname}
        placeholder={t('Ваша фамилия')}
        onChange={onChangeLastname}
        readonly={readonly}
        data-testid="ProfileCard.lastname"
      />
      <Input
        value={data?.age}
        placeholder={t('Ваша возраст')}
        onChange={onChangeAge}
        readonly={readonly}
      />
      <Input
        value={data?.city}
        placeholder={t('Ваша город')}
        onChange={onChangeCity}
        readonly={readonly}
      />
      <Input
        value={data?.username}
        placeholder={t('Введите имя пользователя')}
        onChange={onChangeUsername}
        readonly={readonly}
      />
      <Input
        value={data?.avatar}
        placeholder={t('Введите ссылку на аватар')}
        onChange={onChangeAvatar}
        readonly={readonly}
      />
      <CurrencySelect
        value={data?.currency}
        onChange={onChangeCurrency}
        readonly={readonly}
      />
      <CountrySelect
        value={data?.country}
        onChange={onChangeCountry}
        readonly={readonly}
      />
    </VStack>
  )
}
