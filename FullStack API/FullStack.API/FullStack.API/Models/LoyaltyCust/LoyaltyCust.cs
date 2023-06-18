using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FullStack.API.Models.LoyaltyCust
{
    public class LoyaltyCust
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public decimal CustID { get; set; }
        public string CardNo { get; set; }
        public string CustName { get; set; }
        public string Add1 { get; set; }
        public string Add2 { get; set; }
        public string Add3 { get; set; }
        public string RefNo { get; set; }
        public string HomePhone { get; set; }
        public string MobilePhone { get; set; }
        public string CustType { get; set; }
        public int IsIssued { get; set; }
        public DateTime IssueDate { get; set; }
        public DateTime CreatDate { get; set; }
        public string CollectionType { get; set; }
        public DateTime AppTime { get; set; }
        public  bool IsPrint { get; set; }
        public DateTime PrintTime { get; set; }
        public string Email { get; set; }
        public string NamePrintOnCard { get; set; }
    }
}
