export default abstract class ComponentType {
  public abstract name: string;
  public abstract update: (delta: number) => void;
  public abstract dispose: () => void;
}
