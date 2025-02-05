using Persistence.Data.Seed.SeedChild;

namespace Persistence.Data.Seed
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            SeedCategory.Seed(serviceProvider);
            SeedVariation.Seed(serviceProvider);
            SeedVariationOption.Seed(serviceProvider);
            SeedProduct.Seed(serviceProvider);
            SeedProductItem.Seed(serviceProvider);
            SeedProductConfiguration.Seed(serviceProvider);
        }
    }      
}
