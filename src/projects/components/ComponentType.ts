export default abstract class ComponentType {
  public abstract name: string;
  public abstract update: () => void;
  public abstract dispose: () => void;
}
