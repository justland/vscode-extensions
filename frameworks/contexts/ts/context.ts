import { commandRegistry, CommandRegistry, ReadonlyCommandRegistry, toReadonlyCommandRegistry } from '@just-web/commands'
import {
  commandContributionRegistry,
  CommandContributionRegistry,
  KeyBindingContributionRegistry,
  keyBindingRegistry, ReadonlyCommandContributionRegistry,
  ReadonlyKeyBindingContributionRegistry
} from '@just-web/contributions'
import { createErrorStore, ErrorStore, ReadonlyErrorStore, toReadonlyErrorStore } from '@just-web/errors'
import * as platform from '@just-web/platform'
import * as states from '@just-web/states'
import { toReadonlyRegistry } from '@just-web/states'
import { record } from 'type-plus'

export interface Context {
  commands: {
    registry: CommandRegistry
  },
  contributions: {
    commands: CommandContributionRegistry,
    keyBindings: KeyBindingContributionRegistry
  },
  errors: {
    store: ErrorStore
  },
  platform: typeof platform,
  states: typeof states
}

export interface ReadonlyContext {
  commands: {
    registry: ReadonlyCommandRegistry
  },
  contributions: {
    commands: ReadonlyCommandContributionRegistry,
    keyBindings: ReadonlyKeyBindingContributionRegistry
  },
  errors: {
    store: ReadonlyErrorStore
  },
  platform: Context['platform'],
  states: Context['states']
}

let readonlyContext: ReadonlyContext

export namespace createContext {
  export interface Options {
    contributions: {
      commands: commandContributionRegistry.Options['commands'],
      keyBindings: keyBindingRegistry.Options['keyBindings']
    },
    commands: commandRegistry.Options['commands']
  }
}

export function createContext(options?: createContext.Options): Context {

  const errors: Context['errors'] = {
    store: createErrorStore()
  }
  const contributions: Context['contributions'] = {
    commands: commandContributionRegistry(options?.contributions ?? {
      commands: record()
    }),
    keyBindings: keyBindingRegistry(options?.contributions ?? {
      keyBindings: record()
    })
  }
  const commands: Context['commands'] = {
    registry: commandRegistry({
      commands: options?.commands ?? record(),
      contributions
    })
  }

  const context = {
    commands,
    contributions,
    errors,
    platform,
    states
  }

  readonlyContext = toReadonlyContext(context)

  return context
}

function toReadonlyContext(context: Context): ReadonlyContext {
  return {
    commands: {
      registry: toReadonlyCommandRegistry(context.commands.registry)
    },
    contributions: {
      commands: toReadonlyRegistry(context.contributions.commands),
      keyBindings: toReadonlyRegistry(context.contributions.keyBindings)
    },
    errors: {
      store: toReadonlyErrorStore(context.errors.store)
    },
    platform: context.platform,
    states: context.states
  }
}

export function getReadonlyContext() {
  return readonlyContext
}
