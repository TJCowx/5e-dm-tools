/* eslint-disable import/prefer-default-export */
import {
  array as yupArray,
  boolean as yupBoolean,
  number as yupNumber,
  object as yupObject,
  string as yupString,
} from 'yup';

import { RequireMessage } from '@constants/validationMessages';

export const SCHEMA = yupObject().shape({
  name: yupString().required({ field: 'name', message: RequireMessage }),
  description: yupString()
    .nullable()
    .when('isAttack', {
      is: false,
      then: () =>
        yupString().required({
          field: 'description',
          message: RequireMessage,
        }),
    }),
  actionTypeId: yupNumber().nullable().required({
    field: 'actionTypeId',
    message: RequireMessage,
  }),
  isAttack: yupBoolean(),
  attackDeliveryId: yupNumber()
    .nullable()
    .when('isAttack', {
      is: true,
      then: () =>
        yupString().required({
          field: 'attackDeliveryId',
          message: RequireMessage,
        }),
    }),
  attackTypeId: yupNumber()
    .nullable()
    .when('isAttack', {
      is: true,
      then: () =>
        yupString().required({
          field: 'attackTypeId',
          message: RequireMessage,
        }),
    }),
  toHit: yupNumber()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable()
    .when('isAttack', {
      is: true,
      then: () =>
        yupNumber()
          .transform((value) => (Number.isNaN(value) ? null : value))
          .required({ field: 'toHit', message: RequireMessage })
          .min(0, {
            field: 'toHit',
            message: 'Must be greater than or equal to 0',
          }),
    }),
  reach: yupNumber()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable()
    .when('isAttack', {
      is: true,
      then: () =>
        yupNumber()
          .transform((value) => (Number.isNaN(value) ? null : value))
          .required({ field: 'reach', message: RequireMessage })
          .min(0, {
            field: 'reach',
            message: 'Must be greater than or equal to 0',
          }),
    }),
  combatantsHit: yupNumber()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable()
    .when('isAttack', {
      is: true,
      then: () =>
        yupNumber()
          .transform((value) => (Number.isNaN(value) ? null : value))
          .required({ field: 'combatantsHit', message: RequireMessage })
          .min(1, {
            field: 'combatantsHit',
            message: 'Must be greater than or equal to 1',
          }),
    }),
  damage: yupArray(
    yupObject().shape({
      defaultDamage: yupString().required({
        field: 'damage',
        message: 'Amount of Damage is required',
      }),
      dice: yupString().required({
        field: 'damage',
        message: 'Damage Dice is required',
      }),
      typeId: yupString().required({
        field: 'damage',
        message: 'Damage Type is required',
      }),
    }),
  ),
});
