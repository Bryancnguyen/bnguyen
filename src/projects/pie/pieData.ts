export const pieData: PieData = [{
  className: 'circle',
  completion: 31,
  color: '#ffdb8d',
}, {
  className: 'circle',
  completion: 13,
  color: '#0AE6E5',
}, {
  className: 'circle',
  completion: 15,
  color: '#ffa28d',
},
{
  className: 'circle',
  completion: 22,
  color: '#ff8db1',
}];


type PieData = Array<Circle>;

type Circle = {
  className: string,
  completion: number,
  color: string,
}