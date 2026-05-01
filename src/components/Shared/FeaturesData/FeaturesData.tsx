import { Icon } from '@iconify/react';

interface Features {
  icon: string;
  title: string;
  description: string;
  color: string;
  text_color: string;
}

interface FeaturesDataProps {
  featuresData: Features[];
  isFooter?: boolean;
  isProduct?: boolean; 
}

export default function FeaturesData({
  featuresData,
  isFooter = false,
  isProduct = false
}: FeaturesDataProps) {
  return (
    <section
      className={
        isFooter
          ? 'bg-green-50'
          : isProduct
          ? '' 
          : 'bg-gray-50'
      }
    >
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-8xl px-6">
        
        {featuresData.map((item, idx) => (
          
          <div
            key={idx}
            className={
              isFooter
                ? 'py-6'
                : isProduct
                ? 'py-2' 
                : 'bg-white rounded-xl p-4 my-8 shadow-sm hover:shadow-md transition-shadow duration-300'
            }
          >

            <div className='flex flex-row'>

              
              <div
                className={
                  isFooter
                    ? 'items-center justify-center flex h-12 w-12 rounded-xl'
                    : 'rounded-full w-12 h-12 items-center justify-center flex'
                }
                style={{ backgroundColor: item.color }}
              >
                <Icon
                  icon={item.icon}
                  className='text-xl font-extrabold'
                  style={{ color: item.text_color }}
                />
              </div>

            
              <div className='ms-4 my-1.5'>
                <h3 className='text-slate-800 font-semibold text-sm'>
                  {item.title}
                </h3>
                <p className='text-xs text-gray-500'>
                  {item.description}
                </p>
              </div>

            </div>

          </div>

        ))}

      </div>
    </section>
  );
}