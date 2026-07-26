export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
    reflecttype: {
        num: 513,
        accuracy: true,
        basePower: 0,
        category: "Status",
        name: "Reflect Type",
        pp: 15,
        priority: 0,
        flags: {
            protect: 1,
            bypasssub: 1,
            allyanim: 1,
            metronome: 1,
        },

        onHit(target, source) {
            if (source.species && (source.species.num === 493 || source.species.num === 773)) {
                return false;
            }

            if (source.terastallized) return false;

            const oldApparentType = source.apparentType;

            let targetTypes = target.getTypes(true).filter(type => type !== '???');

            if (!targetTypes.length) {
                if (target.addedType) {
                    targetTypes = ['Normal'];
                } else {
                    return false;
                }
            }

            /*
            * Preserve the original move's handling of a separately added type,
            * such as Forest's Curse or Trick-or-Treat.
            */
            if (target.addedType && target.addedType !== '???' && !targetTypes.includes(target.addedType)) {
                targetTypes.push(target.addedType);
            }

            this.add('-start', source, 'typechange', '[from] move: Reflect Type', `[of] ${target}`);

            if (source.hasAbility('reflector')) {
            /*
            * Reflector users preserve their original typing.
            *
            * Do not use source.getTypes() here because it contains the old
            * mirrored types. Use the stored pre-Reflector typing instead.
            */
            const baseTypes = source.m.reflectorBaseTypes as string[] | undefined;

            /*
            * This fallback matters if Reflector was obtained after switching
            * in, such as through Skill Swap.
            */
            const preservedTypes = baseTypes ? [...baseTypes]: [...source.getTypes()].filter(type => {
                const oldReflectedTypes = source.m.reflectorTypes as string[] | undefined;
                return !oldReflectedTypes?.includes(type);
            });

            /*
            * Replace the previous reflected types completely.
            *
            * Only target types absent from the user's preserved typing count
            * as newly reflected types.
            */
            const newReflectedTypes: string[] = [];

            for (const type of targetTypes) {
                if (!preservedTypes.includes(type) && !newReflectedTypes.includes(type)) {
                    newReflectedTypes.push(type);
                }
            }

            source.m.reflectorBaseTypes = preservedTypes;
            source.m.reflectorTypes = newReflectedTypes;

            source.setType([...preservedTypes,...newReflectedTypes,]);

            /*
            * All copied types are already represented directly in the types
            * array, so do not also retain one as addedType.
            */
            source.addedType = '';
            } else {
            /*
            * Pokémon without Reflector retain normal Reflect Type behavior:
            * their typing is replaced with the target's typing.
            */
            const copiedBaseTypes = target
                .getTypes(true)
                .filter(type => type !== '???');

            source.setType(copiedBaseTypes);
            source.addedType = target.addedType;
            }

            source.knownType =
            target.isAlly(source) && target.knownType;

            if (!source.knownType) {
            source.apparentType = oldApparentType;
            }
        },

        secondary: null,
        target: "normal",
        type: "Normal",
        zMove: {
            boost: {
            spa: 1,
            },
        },
        contestType: "Clever",
    },
};
