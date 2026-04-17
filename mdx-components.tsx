type MdxProvided = Record<string, unknown>;

export function useMDXComponents(components: MdxProvided = {}): MdxProvided {
  return { ...components };
}
