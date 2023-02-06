/* eslint-disable import/prefer-default-export */
import Ability from '@shared-models/creature/Ability';
import Action from '@shared-models/creature/Action';
import Creature from '@shared-models/creature/Creature';
import Damage from '@shared-models/creature/Damage';
import { LeanDocument, Types } from 'mongoose';
import { AbilityDoc } from '../schema/AbilitySchema';
import { ActionDoc } from '../schema/ActionSchema';
import { DamageDoc } from '../schema/DamageSchema';

const mapDamageDoc = (doc: DamageDoc): Damage => {
  const { _id: id, ...damage } = doc;

  return { id: id.toString(), ...damage };
};

const mapAbilityDoc = (doc: AbilityDoc): Ability => {
  const { _id: id, ...ability } = doc;

  return { id: id.toString(), ...ability };
};

const mapActionDoc = (doc: ActionDoc): Action => {
  const { _id: id, damage, ...action } = doc;

  return {
    id: id.toString(),
    damage: damage.map((d) => mapDamageDoc(d as DamageDoc)),
    ...action,
  };
};

export const mapCreatureDoc = (
  doc: LeanDocument<Creature> & {
    _id: Types.ObjectId;
  }
) => {
  const { _id: id, abilities, actions, ...restOfCreature } = doc;

  return {
    ...restOfCreature,
    id: id.toString(),
    abilities: abilities.map((ability) => mapAbilityDoc(ability as AbilityDoc)),
    actions: actions.map((action) => mapActionDoc(action as ActionDoc)),
  };
};
