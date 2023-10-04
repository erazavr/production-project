import { type Country } from '@/entities/Country';
import { type Currency } from '@/entities/Currency';
import { ProfileCard } from '@/entities/Profile';
import { ValidateProfileErrors } from '../../model/consts/consts';
import { VStack } from '@/shared/ui/Stack';
import { EditableProfileHeader } from '../EditableProfileHeader/EditableProfileHeader';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  type ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { Text, TextVariant } from '@/shared/ui/Text';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';

interface EditableProfileCardProps {
  className?: string;
  id?: string;
}

const initialReducers: ReducersList = {
  profile: profileReducer,
};

export const EditableProfileCard = memo(function EditableProfileCard(
  props: EditableProfileCardProps,
) {
  const { className, id } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const formData = useSelector(getProfileForm);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const readonly = useSelector(getProfileReadonly);
  const validateErrors = useSelector(getProfileValidateErrors);

  const validateErrorsTranslate = {
    [ValidateProfileErrors.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
    [ValidateProfileErrors.INCORRECT_AGE]: t('Некорректный возраст'),
    [ValidateProfileErrors.INCORRECT_COUNTRY]: t('Некорректный регион'),
    [ValidateProfileErrors.NO_DATA]: t('Данные не указаны'),
    [ValidateProfileErrors.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
  };

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id));
    }
  });

  const onChangeFirstname = useCallback(
    (value: string) => {
      dispatch(profileActions.updateProfile({ first: value || '' }));
    },
    [dispatch],
  );

  const onChangeLastname = useCallback(
    (value: string) => {
      dispatch(profileActions.updateProfile({ lastname: value || '' }));
    },
    [dispatch],
  );

  const onChangeAge = useCallback(
    (value: string) => {
      dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
    },
    [dispatch],
  );

  const onChangeCity = useCallback(
    (value: string) => {
      dispatch(profileActions.updateProfile({ city: value || '' }));
    },
    [dispatch],
  );

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(profileActions.updateProfile({ username: value || '' }));
    },
    [dispatch],
  );

  const onChangeAvatar = useCallback(
    (value: string) => {
      dispatch(profileActions.updateProfile({ avatar: value || '' }));
    },
    [dispatch],
  );

  const onChangeCurrency = useCallback(
    (currency: Currency) => {
      dispatch(profileActions.updateProfile({ currency }));
    },
    [dispatch],
  );

  const onChangeCountry = useCallback(
    (country: Country) => {
      dispatch(profileActions.updateProfile({ country }));
    },
    [dispatch],
  );

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <VStack gap={'8'} max className={classNames('', {}, [className])}>
        <EditableProfileHeader />
        {validateErrors?.length &&
          validateErrors.map(err => (
            <Text
              key={err}
              variant={TextVariant.ERROR}
              text={validateErrorsTranslate[err]}
              data-testid={'EditableProfileCard.Error'}
            />
          ))}
        <ProfileCard
          data={formData}
          isLoading={isLoading}
          error={error}
          onChangeFirstname={onChangeFirstname}
          onChangeLastname={onChangeLastname}
          onChangeAge={onChangeAge}
          onChangeCity={onChangeCity}
          readonly={readonly}
          onChangeUsername={onChangeUsername}
          onChangeAvatar={onChangeAvatar}
          onChangeCurrency={onChangeCurrency}
          onChangeCountry={onChangeCountry}
        />
      </VStack>
    </DynamicModuleLoader>
  );
});
