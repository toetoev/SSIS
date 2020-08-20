using System.Collections.Generic;
using System.Net.Mail;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Http;
using MimeKit;

namespace SSIS.Models
{
    public class MailRequest
    {
        public MailboxAddress Sender { get; set; }
        public MailboxAddress Receiver { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }

    }
}